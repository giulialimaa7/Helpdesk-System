import dotenv from 'dotenv';
import nodemailer from 'nodemailer'

dotenv.config();

export default class EmailService {
  //configuração do transporte de email
  static transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  //configuração de envio de email 
  static async sendEmail(to, subject, html, attachments = []) {
    try {
      let mailOptions = {
        from: `"Helpdesk" <${ process.env.EMAIL_FROM || process.env.EMAIL_USER }>`,
        to,
        subject,
        html,
        attachments
      };

      const result = await this.transporter.sendMail(mailOptions); 
      console.log("Email enviado com sucesso!", result.messageId);

      return result;    
    } 
    catch (error) {
      throw new Error("Erro ao enviar email");
    }
  }
}