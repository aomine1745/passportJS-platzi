const boom = require('@hapi/boom')
const joi = require('@hapi/joi')

function validate (data, schema) {
  try {
    joi.assert(data, schema)
    return false
  } catch (error) {
    return error
  }
}

function validationHandler (schema, check = 'body') {
  return function (req, res, next) {
    const error = validate(req[check], schema)
    error ? next(boom.badRequest(error)) : next()
  }
}

module.exports = validationHandler
