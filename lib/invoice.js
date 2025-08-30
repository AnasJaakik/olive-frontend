// lib/invoice.js
import PDFDocument from "pdfkit";

function euros(cents) {
  return (cents / 100).toFixed(2);
}

async function loadStaticPaypalQR() {
  try {
    // Use your own host in both dev & prod
    const base = process.env.APP_URL || "http://localhost:3000";
    const url = `${base.replace(/\/$/, "")}/paypal-qr.png`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const arr = await res.arrayBuffer();
    return Buffer.from(arr);
  } catch (e) {
    console.warn("⚠️ Could not load PayPal QR:", e.message);
    return null;
  }
}

export async function createInvoicePDF({
  invoiceNumber,
  name,
  email,
  bottles,
  unitPriceCents,
  currency,
  iban,
  bic,
  beneficiary,
  paypalUrl
}) {
  const totalCents = unitPriceCents * bottles;
  const qrBuffer = await loadStaticPaypalQR(); // ← fetch QR over HTTP

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const chunks = [];
  doc.on("data", (c) => chunks.push(c));
  const done = new Promise((res) => doc.on("end", () => res(Buffer.concat(chunks))));

  // Header
  doc.fontSize(20).font("Times-Bold").text("Invoice");
  doc.moveDown(0.3);
  doc
    .fontSize(10)
    .font("Times-Roman")
    .text(`Invoice No: ${invoiceNumber}`)
    .text(`Date: ${new Date().toLocaleDateString()}`)
    .moveDown(0.6);

  // From / To
  doc.font("Times-Bold").text("From:");
  doc.font("Times-Roman").text(beneficiary);
  doc.text("Morocco / Germany");
  doc.moveDown(0.8);

  doc.font("Times-Bold").text("To:");
  doc.font("Times-Roman").text(name);
  doc.text(email);
  doc.moveDown(1);

  // Table header
  doc.font("Times-Bold").text("Description", 50, doc.y);
  doc.text("Qty", 320, doc.y, { width: 60, align: "right" });
  doc.text("Unit", 390, doc.y, { width: 80, align: "right" });
  doc.text("Total", 480, doc.y, { width: 80, align: "right" });
  doc.moveDown(0.4);
  doc.moveTo(50, doc.y).lineTo(560, doc.y).strokeColor("#cccccc").stroke();
  doc.moveDown(0.6);

  // Line item
  doc.font("Times-Roman").text("Extra Virgin Olive Oil 750ml", 50, doc.y);
  doc.text(String(bottles), 320, doc.y, { width: 60, align: "right" });
  doc.text(`${euros(unitPriceCents)} ${currency}`, 390, doc.y, { width: 80, align: "right" });
  doc.text(`${euros(totalCents)} ${currency}`, 480, doc.y, { width: 80, align: "right" });
  doc.moveDown(1);

  // Totals
  doc.moveTo(50, doc.y).lineTo(560, doc.y).strokeColor("#cccccc").stroke();
  doc.moveDown(0.6);
  doc.font("Times-Bold").text("Amount Due:", 390, doc.y, { width: 80, align: "right" });
  doc.text(`${euros(totalCents)} ${currency}`, 480, doc.y, { width: 80, align: "right" });
  doc.moveDown(1.2);

  // PayPal
  doc.font("Times-Bold").text("PayPal:");
  if (paypalUrl) {
    doc.font("Times-Roman").fillColor("#0000EE").text(paypalUrl, { link: paypalUrl, underline: true }).fillColor("black");
  }
  doc.moveDown(0.4);
  if (qrBuffer) {
    doc.image(qrBuffer, { fit: [130, 130] });
  } else {
    doc.font("Times-Roman").fillColor("#666").text("(QR unavailable — please use the PayPal link)").fillColor("black");
  }
  doc.moveDown(0.8);

  // Bank transfer
  doc.font("Times-Bold").text("Bank Transfer (IBAN):");
  doc
    .font("Times-Roman")
    .text(`Beneficiary: ${beneficiary}`)
    .text(`IBAN: ${iban}`)
    .text(`BIC: ${bic}`)
    .text(`Reference: ${invoiceNumber}`);
  doc.moveDown(0.8);

  doc.fontSize(9).fillColor("#666").text("Please include the invoice number as the payment reference.", { width: 500 });

  doc.end();
  return done; // Buffer
}

