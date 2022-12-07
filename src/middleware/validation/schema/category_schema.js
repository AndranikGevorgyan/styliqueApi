const Joi = require('@hapi/joi')

const CategorySchema = {
    addCategory: {
        body: Joi.object({
            name: Joi.string().min(1).max(255).required(),
            description: Joi.string().min(1).max(255).required(),
        })
    },
    deleteCategory: {
        params: Joi.object({ id: Joi.number().min(1).integer() }).min(1).required()
    },

}
module.exports = CategorySchema