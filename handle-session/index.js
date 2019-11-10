const express = require('express')
const session = require('express-session')

const app = express()
const PORT = 3000

app.use(
    session({
    resave: false,
    saveUninitialized: false,
    secret: 'keyboard cat'
  })
)

app.get('/', (req, res) => {
  req.session.count = req.session.count ? req.session.count + 1 : 1

  res.status(200).json({
    chupetin: 'vas a caer ctmr GAAAAAAAAAAAAAAA :V',
    counter: req.session.count
  })
})

app.listen(PORT, (err) => {
  if (err) console.log('An error has ben ocurred')
  console.log(`the app is listening in http://localhost:${PORT}`)
})