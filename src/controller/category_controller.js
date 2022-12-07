const { CategoryService, UserService } = require("../service")
const UserController = require("./user_controller")
const { ErrorUtil, SuccessHandlerUtil } = require('../util')
const { InputValidationError } = ErrorUtil



class CategoryController {
    static async create(request, response, next) {
        try {
            const payload = { ...request.body }
            const category = await CategoryService.create(payload)
            if (!category) throw new InputValidationError('Cannot add Category')
            SuccessHandlerUtil.handleAdd(response, next, category)
        } catch (error) {
            next(error)
        }
    }
    static async get(request, response, next) {
        try {
            const categories = await CategoryService.get()
            if (!categories) throw new InputValidationError('Cannot get Categories')
            SuccessHandlerUtil.handleList(response, next, categories)
        } catch (error) {
            next(error)
        }
    }
    static delete(request, response, next) {
        try {
            const { id } = request.params
            CategoryService.delete(id)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = CategoryController