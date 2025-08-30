import prisma from "../lib/db.js";
import { hashToken } from "../lib/tokens.js";
import { createInvoicePDF } from "../lib/invoice.js";
import { makeInvoiceNumber } from "../lib/invoiceNumber.js";
import { sendEmail } from "../lib/email.js";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).send("Method not allowed");

  try {
    const { pid, token } = req.query || {};
    if (!pid || !token) return res.status(400).send("Missing parameters.");

    const preorder = await prisma.preorder.findUnique({
      where: { id: String(pid) },
      include: { customer: true, invoice: true }
    });
    if (!preorder) return res.status(404).send("Preorder not found.");

    const hashed = hashToken(String(token));
    if (!preorder.verifyTokenHash || preorder.verifyTokenHash !== hashed || !preorder.verifyExpiresAt || preorder.verifyExpiresAt < new Date()) {
      return res.status(400).send("Invalid or expired link.");
    }

    await prisma.preorder.update({
      where: { id: preorder.id },
      data: { status: "VERIFIED", verifyTokenHash: null, verifyExpiresAt: null }
    });

    const unit = Math.round(Number(process.env.PRICE_EUR || 29) * 100);
    const currency = process.env.CURRENCY || "EUR";
    const seq = Math.floor(Date.now() / 1000);
    const invoiceNumber = makeInvoiceNumber(seq);
    const paypalUrl = process.env.PAYPAL_URL || "";

    const invoice = await prisma.invoice.create({
      data: {
        preorderId: preorder.id,
        number: invoiceNumber,
        currency,
        unitPriceCents: unit,
        totalCents: unit * preorder.bottles,
        paypalLink: paypalUrl
      }
    });

    const pdf = await createInvoicePDF({
      invoiceNumber,
      name: preorder.customer.name,
      email: preorder.customer.email,
      bottles: preorder.bottles,
      unitPriceCents: unit,
      currency,
      iban: process.env.IBAN,
      bic: process.env.BIC,
      beneficiary: process.env.BENEFICIARY,
      paypalUrl
    });

    await sendEmail({
      to: preorder.customer.email,
      subject: `Your Invoice — Abdeljalil Olive Oil (${invoice.number})`,
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#222">
          <p>Thank you for confirming your email.</p>
          <p>Your invoice <strong>${invoice.number}</strong> is attached.</p>
          <p>You can pay via:</p>
          <ul>
            <li>PayPal: <a href="${paypalUrl}">${paypalUrl}</a> (or scan the QR in the invoice)</li>
            <li>Bank transfer (IBAN): <strong>${process.env.IBAN}</strong> — BIC: ${process.env.BIC}</li>
          </ul>
          <p>Please include the reference <strong>${invoice.number}</strong> with your payment.</p>
        </div>
      `,
      attachments: [{
        filename: `${invoice.number}.pdf`,
        content: pdf.toString("base64"),
        contentType: "application/pdf"
      }]
    });

    await prisma.preorder.update({
      where: { id: preorder.id },
      data: { status: "INVOICED" }
    });

    const redirectTo = `${process.env.APP_URL}/verified`;
    res.writeHead(302, { Location: redirectTo });
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error.");
  }
}
