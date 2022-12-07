const Joi = require('@hapi/joi')

const { ErrorUtil } = require('../../../util')
const { InputValidationError } = ErrorUtil

class ValidatorUtil {
  /**
   * @param {Object} args
   * @param {Object} schema
   * @param {Function} next
   * @description Validate input with given schema.
   */
  static validate(args, schema, next) {
    const { error } = Joi.validate(args, schema, ValidatorUtil.OPTIONS)

    if (error) {
      const msg = error && error.details && error.details[0] && error.details[0].message
      return next(new InputValidationError(msg))
    }
    next()
  }

  static validateArgs(req, schema, next) {
    const temp = {}
    for (const field in schema) {
      temp[field] = req[field]
    }
    const { value, error } = Joi.validate(temp, schema, ValidatorUtil.OPTIONS)
    if (error) {
      const msg = error.details && error.details[0] && error.details[0].message
      return next(new InputValidationError(msg))
    }
    for (const field in value) {
      req[field] = value[field]
    }
    next()
  }
}

ValidatorUtil.OPTIONS = {
  abortEarly: true,
  allowUnknown: false,
  convert: true
}

module.exports = ValidatorUtil
