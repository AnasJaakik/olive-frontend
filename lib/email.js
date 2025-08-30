// /lib/email.js
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, html, attachments }) {
  return resend.emails.send({
    from: process.env.FROM_EMAIL,
    to,
    bcc: process.env.BCC_EMAIL || undefined,
    subject,
    html,
    attachments
  });
}


