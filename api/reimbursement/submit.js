import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  try {
    const { to, cc, subject, message, attachments } = req.body;

    const resend = new Resend(process.env.RESEND_API_KEY);

    const mapped = attachments?.map(a => ({
      filename: a.filename,
      content: Buffer.from(a.content, "base64"),
      type: a.contentType
    }));

    await resend.emails.send({
      from: "noreply@seu-dominio.com",
      to,
      cc,
      subject,
      text: message,
      attachments: mapped
    });

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Falha ao enviar e-mail." });
  }
}
