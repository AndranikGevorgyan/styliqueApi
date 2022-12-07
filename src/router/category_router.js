const router = require('express').Router()


const { CategoryController } = require('../controller')
const Auth = require('../Auth')
const { ValidationMiddleware } = require('../middleware')
const { CategoryValidationMiddleware } = ValidationMiddleware


const ADMIN = ['Admin']
const ACCESS = ['Admin', 'Moderator']


router.post('/',
    CategoryValidationMiddleware.validateAddCategoryArgs,
    Auth.authenticateFor(ACCESS),
    CategoryController.create)

router.get('/',
    CategoryController.get)

router.delete('/:id',
    CategoryValidationMiddleware.validateDeleteCategoryArgs,
    Auth.authenticateFor(ADMIN),
    CategoryController.delete)

module.exports = router