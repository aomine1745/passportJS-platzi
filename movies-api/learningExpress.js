const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer() // Para datos tipo multipart/form-data

app.use(bodyParser.json()) // Para datos tipo application/json
app.use(bodyParser.urlencoded({ extended: true })) // Para datos tipo application/x-www-form-urlencoded

const { config } = require('./config')

app.get('/', (req, res) => {
  res.send('hello world by aomine')
})

app.get('/jsonSend', (req, res) => {
  res.send({ hello: 'hello world' })
})

app.get('/user/:name', (req, res) => {
  // res.send(`hello user ${req.params.name}`)
  res.send(req.query)
})

app.get('/challenge/:year?', (req, res) => {
  const year = req.params.year

  if (!year) {
    res.send('parametro no especificado')
    return
  }

  if (year % 4 !== 0) {
    res.send('El año NO es viciesto')
    return
  }

  res.send('El año SI es viciesto')
})

app.post('/profile', upload.array(), (req, res, next) => {
  res.json(req.body)
})

app.get('/query', (req, res) => {
  // http://localhost:3000/query?name=aomine
  res.send(req.query.name)
})

app.get('/end', (req, res) => {
  res.status(404).end()
})

app.get('/json', (req, res) => {
  // res.json(null)
  res.json({ user: 'tobi' })
  // res.status(500).json({ error: 'message' })
})

app.get('/send', (req, res) => {
  // res.send(Buffer.from('whoop'))
  // res.send({ some: 'json' })
  res.send('<p>some html</p>')
  // res.status(404).send('Sorry, we cannot find that!')
  // res.status(500).send({ error: 'something blew up' })
})

app.listen(config.port, () => {
  console.log(`listening http://localhost:${config.port}`)
})
