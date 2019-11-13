const assert = require('assert')
const proxyquire = require('proxyquire')

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies')
const testServer = require('../utils/testServer')

describe('routes - movies', function () {
  const route = proxyquire('../routes/movies', {
    '../services/movies': MoviesServiceMock
  })

  const request = testServer(route)

  describe('GET /movies', function () {
    it('shuld respond with status 200', function (done) {
      request.get('/api/movies').expect(200, done)
    })

    it('should respond with the list of movies', function (done) {
      // eslint-disable-next-line handle-callback-err
      request.get('/api/movies').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock,
          message: 'movies listed'
        })

        done()
      })
    })
  })

  describe('GET /movies/:movieId', function () {
    it('shuld respond with status 200', function (done) {
      request.get('/api/movies/5dc08c93c07b9e2ba861c4a2').expect(200, done)
    })

    it('should respond with the movie', function (done) {
      // eslint-disable-next-line handle-callback-err
      request.get('/api/movies/5dc08c93c07b9e2ba861c4a2').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock[0],
          message: 'movie retrieved'
        })

        done()
      })
    })
  })

  describe('POST /movies', function () {
    it('shuld respond with status 201', function (done) {
      request.post('/api/movies').expect(201, done)
    })

    it('should respond with the movieId', function (done) {
      // eslint-disable-next-line handle-callback-err
      request.post('/api/movies').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock[0].id,
          message: 'movie created'
        })

        done()
      })
    })
  })

  describe('PUT /movies', function () {
    it('shuld respond with status 200', function (done) {
      request.put('/api/movies/5dc08c93c07b9e2ba861c4a2').expect(200, done)
    })

    it('should respond with the movieId', function (done) {
      // eslint-disable-next-line handle-callback-err
      request.put('/api/movies/5dc08c93c07b9e2ba861c4a2').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock[0].id,
          message: 'movie updated'
        })

        done()
      })
    })
  })

  describe('DELETE /movies', function () {
    it('shuld respond with status 200', function (done) {
      request.delete('/api/movies/5dc08c93c07b9e2ba861c4a2').expect(200, done)
    })

    it('should respond with the movieId', function (done) {
      // eslint-disable-next-line handle-callback-err
      request.delete('/api/movies/5dc08c93c07b9e2ba861c4a2').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock[0].id,
          message: 'movie deleted'
        })

        done()
      })
    })
  })
})
