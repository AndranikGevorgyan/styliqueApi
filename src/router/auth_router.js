const router = require('express').Router()

const Auth = require('../Auth')
const { ValidationMiddleware } = require('../middleware')
const { UserValidationMiddleware } = ValidationMiddleware

router.post('/login',
    UserValidationMiddleware.validateLoginUserArgs,
    Auth.loginUser
)
router.post('/logout',
  Auth.logoutUser
)

module.exports =router