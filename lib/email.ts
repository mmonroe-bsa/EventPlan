import nodemailer from "nodemailer";

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export function getTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

export async function sendEmail(payload: EmailPayload) {
  const transport = getTransport();
  return transport.sendMail({
    from: process.env.SMTP_FROM ?? "no-reply@eventplan.local",
    to: payload.to,
    subject: payload.subject,
    html: payload.html
  });
}
