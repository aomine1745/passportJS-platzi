// Express
const express = require('express')
const helmet = require('helmet')

const app = express()

// Resources
const { config } = require('./config')
const moviesApi = require('./routes/movies')
const userMoviesApi = require('./routes/userMovies')
const authApi = require('./routes/auth')
const debug = require('debug')('app:server')

// middlewares
const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers')
const notFoundHandler = require('./utils/middleware/notFoundHandler')
const cors = require('cors')

// const corsOptions = {
//   origin: config.cors
// }

// Body parser
app.use(express.json())
// helmet
app.use(helmet())
// cors
app.use(cors())

// Routes
authApi(app)
moviesApi(app)
userMoviesApi(app)

// Catch 404
app.use(notFoundHandler)

// Error handlers
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)
app.listen(config.port, () => {
  debug(`listening http://localhost:${config.port}`)
})
