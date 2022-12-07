// NPM Modules
const router = require('express').Router()


const { UserController } = require('../controller')
const { ValidationMiddleware } = require('../middleware')
const { UserValidationMiddleware } = ValidationMiddleware


router.post('/create',
  UserValidationMiddleware.validateAddUserArgs,
  UserController.create)

module.exports = router