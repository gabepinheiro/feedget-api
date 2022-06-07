import express from 'express'

const app = express()

app.get('/users', (req, res) => {
  return res.send('Hello World')
})

app.listen(3333, () => console.log('HTTP server is running on port 3333'))
