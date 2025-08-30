 // /api/preorders.js
import prisma from "../lib/db.js";
import { z } from "zod";
import { createVerifyToken } from "../lib/tokens.js";
import { sendEmail } from "../lib/email.js";

const origin = process.env.CORS_ORIGIN;

export default async function handler(req, res) {
  try {
    // CORS (dev)
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
    }
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.status(200).end();
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    // Body parsing guard (Vercel usually parses JSON, but be safe)
    let body = req.body;
    if (!body) {
      const text = await new Promise((r) => {
        let d = "";
        req.on("data", (c) => (d += c));
        req.on("end", () => r(d));
      });
      body = text ? JSON.parse(text) : {};
    }
    // Log payload during dev
    console.log("preorders payload:", body);

    // Validate
    const schema = z.object({
      name: z.string().min(1, "name required").max(120),
      email: z.string().email("invalid email"),
      bottles: z.coerce.number().int().min(1).max(12),
      lang: z.enum(["en", "de"]).default("en"),
      note: z.string().max(1000).optional()
    });
    const payload = schema.parse(body);

    // Create/Update customer
    const customer = await prisma.customer.upsert({
      where: { email: payload.email },
      update: { name: payload.name },
      create: { name: payload.name, email: payload.email }
    });

    // Token
    const { token, hash, expires } = createVerifyToken(24);
    const preorder = await prisma.preorder.create({
      data: {
        customerId: customer.id,
        bottles: payload.bottles,
        lang: payload.lang,
        status: "PENDING_VERIFICATION",
        verifyTokenHash: hash,
        verifyExpiresAt: expires
      }
    });

    // Verify link
    const url = new URL("/api/verify", process.env.APP_URL || "http://localhost:3000");
    url.searchParams.set("pid", preorder.id);
    url.searchParams.set("token", token);

    const btn = `display:inline-block;background:#4c4c1e;color:#fff;padding:12px 16px;border-radius:10px;text-decoration:none;font-weight:700`;

    // Email (clear error if misconfigured)
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY");
    }
    if (!process.env.FROM_EMAIL) {
      throw new Error("Missing FROM_EMAIL");
    }

    await sendEmail({
      to: payload.email,
      subject:
        payload.lang === "de"
          ? "E-Mail bestätigen – Abdeljalil Olive Oil"
          : "Confirm your email – Abdeljalil Olive Oil",
      html: `
        <div style="font-family:Arial,Helvetica,sans-serif;color:#222">
          <p>${
            payload.lang === "de"
              ? "Bitte bestätigen Sie Ihre E-Mail. Danach erhalten Sie automatisch Ihre Rechnung."
              : "Please confirm your email. After that, you’ll automatically receive your invoice."
          }</p>
          <p><a style="${btn}" href="${url.toString()}">${
        payload.lang === "de" ? "E-Mail bestätigen" : "Confirm Email"
      }</a></p>
          <p style="color:#666;font-size:12px">Link expires in 24 hours.</p>
        </div>
      `
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error("preorders error:", err);
    // Resend often throws with `name` and `message`
    const msg =
      err?.issues?.[0]?.message || // zod
      err?.message ||
      "Internal error";
    return res.status(500).json({ error: msg });
  }
}
