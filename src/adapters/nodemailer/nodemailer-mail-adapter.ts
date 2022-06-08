import { MailAdapter, SendMailData } from "../mail-adapter";

import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "cd97573becdaa5",
    pass: "88e3f8e00b25bf"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail ({subject, body}: SendMailData) {

    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Gabe <gabrielpsil19@gmail.com>',
      subject,
      html: body
    })
  };
}
