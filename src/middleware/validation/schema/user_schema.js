const Joi = require('@hapi/joi')

const UserSchema = {
  addUser: {
    body: Joi.object({
      full_name: Joi.string().min(1).max(255).required(),
      username: Joi.string().email().required(),
      role_id: Joi.number().min(1).integer()
    })
  },
  loginUser: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(7).max(255).required()
    })
  },

}
module.exports = UserSchema