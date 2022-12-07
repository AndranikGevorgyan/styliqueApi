const ArticleSchema = require('./schema/article_schema')
const ValidatorUtil = require('./util/validator_util')

class ArticleValidation {
    static validateAddArticleArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, ArticleSchema.addArticle, next)
    }
}

module.exports = ArticleValidation