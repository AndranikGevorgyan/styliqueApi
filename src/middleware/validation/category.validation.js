const CategorySchema = require('./schema/category_schema')
const ValidatorUtil = require('./util/validator_util')

class CategoryValidation {
    static validateAddCategoryArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, CategorySchema.addCategory, next)
    }
    static validateDeleteCategoryArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, CategorySchema.deleteCategory, next)
    }
}
module.exports = CategoryValidation