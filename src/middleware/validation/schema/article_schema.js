const Joi = require('@hapi/joi')

const ArticleSchema = {
    addArticle: {
        body: Joi.object({
            name: Joi.string().min(1).max(255).required(),
            content: Joi.string().min(1).max(255).required(),
            user_id: Joi.number().min(1).integer(),
            category_id: Joi.number().min(1).integer()
        })
    },

}
module.exports = ArticleSchema