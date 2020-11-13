import { createTransport, Transporter } from "nodemailer";
import { errorLogger, debugLogger } from "./log";

class Mailer {
  private static SMTP_HOST = process.env.SMTP_HOST;
  private static SMTP_PORT: number = parseInt(process.env.SMTP_PORT || "587");
  private static SMTP_AUTH_USER = process.env.SMTP_AUTH_USER;
  private static SMTP_AUTH_PASS = process.env.SMTP_AUTH_PASS;
  public static SMTP_MAIL_FROM = process.env.SMTP_MAIL_FROM;

  private static transporter: Transporter = createTransport({
    host: Mailer.SMTP_HOST,
    port: Mailer.SMTP_PORT,
    auth: {
      user: Mailer.SMTP_AUTH_USER,
      pass: Mailer.SMTP_AUTH_PASS,
    },
  });

  private static async sendWithSmtp(
    target: string,
    subject: string,
    content: string
  ): Promise<any> {
    const mailOptions = {
      from: Mailer.SMTP_MAIL_FROM,
      to: target.replace(";", ","),
      subject,
      html: content,
    };
    try {
      Mailer.transporter.sendMail(mailOptions);
      debugLogger.info("mail: send mail success");
    } catch (err) {
      errorLogger.error(`mail: ${err.message}`);
    }
  }

  public static async send(target: string, subject: string, content: string): Promise<any> {
    Mailer.sendWithSmtp(target, subject, content);
  }
}

export default Mailer;