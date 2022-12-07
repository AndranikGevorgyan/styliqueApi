
const UserSchema = require('./schema/user_schema')
const ValidatorUtil = require('./util/validator_util')

class UserValidation {
    static validateAddUserArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, UserSchema.addUser, next);
    }
    static validateLoginUserArgs(req, res, next) {
        ValidatorUtil.validateArgs(req, UserSchema.loginUser, next)
    }
}
module.exports = UserValidation