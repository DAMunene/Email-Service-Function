import * as nodemailer from 'nodemailer';
import { ContactFormData, EmailConfig } from '@/types/contact';
import { generateHtmlTemplate, generatePlainTextTemplate } from './email-templates';

export class EmailService {
  private transporter: nodemailer.Transporter;
  private config: EmailConfig;

  constructor(config: EmailConfig) {
    this.config = config;
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendContactFormEmail(data: ContactFormData): Promise<void> {
    const subject = `🌟 New Contact Form Submission from ${data.fullName}`;
    const htmlContent = generateHtmlTemplate(data);
    const textContent = generatePlainTextTemplate(data);

    const mailOptions = {
      from: this.config.from,
      to: this.config.user, // Send to the same email that's used for authentication
      subject,
      text: textContent,
      html: htmlContent,
      replyTo: data.email,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email notification');
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('SMTP connection failed:', error);
      return false;
    }
  }
}