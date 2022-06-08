import express from 'express'

import { prismaClient } from './prisma'

import nodemailer from 'nodemailer'

const app = express()

app.use(express.json())

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "cd97573becdaa5",
    pass: "88e3f8e00b25bf"
  }
});


app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const feedback = await prismaClient.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Gabe <gabrielpsil19@gmail.com>',
    subject: 'Novo Feedback',
    html: [
      '<div style="font-family: sans-serif; font-size:16px; color: #111">',
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      '</div>'
    ].join('\n')
  })

  return res.status(201).json({ data: feedback })
})

app.listen(3333, () => console.log('HTTP server is running on port 3333'))
