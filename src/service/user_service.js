const { UserModel } = require("../model")


class UserService {
    static create(payload) {
        return UserModel.create(payload)
    }
}

module.exports = UserService