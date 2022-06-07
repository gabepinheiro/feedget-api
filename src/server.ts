import express from 'express'
import { prismaClient } from './prisma'

const app = express()

app.use(express.json())

app.post('/feedbacks', async (req, res) => {
  const feedback = await prismaClient.feedback.create({
    data: req.body
  })

  return res.status(201).json({ data: feedback })
})

app.listen(3333, () => console.log('HTTP server is running on port 3333'))
