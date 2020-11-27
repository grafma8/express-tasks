import { createTransport, Transporter } from "nodemailer";
import { errorLogger, debugLogger } from "./log";
import {APP_HOST_URL} from "../config/appConstants"

export class Mailer {
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

  public static async sendEmailVerificationMail(target_email: string, target_name: string, activation_token: string): Promise<any> {
    const subject = "Email Address Verification";
    const content = `
      Hi ${target_name},<br>
      <br>
      Welcome.<br>
      <br>
      To activate your account, click on the following link:<br>
      <a href="${APP_HOST_URL}/register/start/?token=${activation_token}">${APP_HOST_URL}/register/start/?token=${activation_token}</a><br>
      <br>
      Thanks, From ~~~ support.
    `;
    Mailer.send(target_email, subject, content);
  }
}