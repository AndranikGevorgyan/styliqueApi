const router = require('express').Router()

const Auth = require('../Auth')
const { ValidationMiddleware } = require('../middleware')
const { ArticleValidationMiddleware } = ValidationMiddleware
const { ArticleController } = require('../controller')
const MODERATOR = ['Moderator']
router.post('/',
    ArticleValidationMiddleware.validateAddArticleArgs,
    Auth.authenticateFor(MODERATOR),
    ArticleController.create)

router.get('/', ArticleController.get)

module.exports = router