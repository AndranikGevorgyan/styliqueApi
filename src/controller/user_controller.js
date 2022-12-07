const { UserService } = require("../service")
const { ErrorsUtil, SuccessHandlerUtil } = require('../util')



class UserController {
    static async create(request, response, next) {
        try {
            const payload = { ...request.body }
            return await UserService.create(payload)
        } catch (error) {
            next(error)
        }
    }
}
module.exports = UserController