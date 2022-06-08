import express from 'express'

import nodemailer from 'nodemailer'
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "cd97573becdaa5",
    pass: "88e3f8e00b25bf"
  }
});


routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbacksRepository = new PrismaFeedbackRepository()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository
  )

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })

  // await transport.sendMail({
  //   from: 'Equipe Feedget <oi@feedget.com>',
  //   to: 'Gabe <gabrielpsil19@gmail.com>',
  //   subject: 'Novo Feedback',
  //   html: [
  //     '<div style="font-family: sans-serif; font-size:16px; color: #111">',
  //     `<p>Tipo do feedback: ${type}</p>`,
  //     `<p>Comentário: ${comment}</p>`,
  //     '</div>'
  //   ].join('\n')
  // })

  return res.status(201).send()
})
