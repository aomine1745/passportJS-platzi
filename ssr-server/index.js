const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const cookieParser = require('cookie-parser')
const axios = require('axios')
const { config } = require('./config')

const app = express()
const THIRTY_DAYS_IN_SEC = 2592000
const TWO_HOURS_IN_SEC = 7200

// body parser
app.use(express.json())
// cookie parser
app.use(cookieParser())

// Basic strategy
require('./utils/auth/strategies/basic')
app.post('/auth/sign-in', async (req, res, next) => {
  const { rememberMe } = req.body

  passport.authenticate('basic', (error, data) => {
    try {
      if (error || !data) next(boom.unauthorized())

      req.login(data, { session: false }, async error => {
        if (error) next(error)

        const { token, ...user } = data

        res.cookie('token', token, {
          httpOnly: !config.dev,
          secure: !config.dev,
          maxAge: rememberMe ? THIRTY_DAYS_IN_SEC : TWO_HOURS_IN_SEC
        })

        res.status(200).json(user)
      })
    } catch (error) {
      next(error)      
    }
  })(req, res, next)
})

app.post('/auth/sign-up', async (req, res, next) => {
  const { body: user } = req

  try {
    await axios({
      url: `${config.apiUrl}/api/auth/sign-in`,
      method: 'post',
      data: user
    })

    res.status(201).json({ message: 'user created' })
  } catch (error) {
    next(error)
  }
})

app.get('/movies', async (req, res, next) => {

})

app.post('/user-movies', async (req, res, next) => {
  try {
    const { body: userMovie } = req
    const { token } = req.cookies

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'post',
      data: userMovie
    })

    if (status !== 201) return next(boom.badImplementation())

    res.status(status).json(data)

  } catch (error) {
    next(error)
  }
})

app.delete('/user-movies/:userMovieId', async (req, res, next) => {
  try {
    const { userMovieId } = req.params
    console.log(userMovieId)
    const { token } = req.cookies

    const { data, status } = await axios({
      url: `${config.apiUrl}/api/user-movies/${userMovieId}`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: 'delete'
    })

    if (status !== 200) return next(boom.badImplementation())

    res.status(status).json(data)

  } catch (error) {
    next(error)
  }
})

app.listen(config.port, err => {
  if (err) return console.log('an error has been occurred')

  console.log(`app listening in http://localhost:${config.port}`)
})