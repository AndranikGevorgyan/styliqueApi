require('dotenv').config()
const jwt = require('jsonwebtoken')

const { TokenModel, UserModel } = require('../model')
const { CryptoUtil, ErrorUtil } = require('../util')
const { InvalidPasswordError, ResourceNotFoundError } = ErrorUtil
class AuthModel {
  static generateTokens(payload) {

    const access_token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_TOKEN_LIFETIME })
    const refresh_token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_TOKEN_LIFETIME })
    return {
      access_token,
      refresh_token
    }
  }
  static async saveToken(user_id, refresh_token) {

    const tokenData = await TokenModel.getByUserId(user_id)
    if (tokenData) {
      await TokenModel.updateByUserID(user_id, refresh_token)
      tokenData.refresh_token = refresh_token
      return tokenData
    }

    return await TokenModel.create({ refresh_token, user_id })
  } catch(error) {
    return Promise.reject(error)


  }

  static async login(payload) {
    payload.username = payload.username.toLowerCase()
    const user = UserModel.getByUsername(payload.username)

    if (!user) {
      return Promise.reject(new ResourceNotFoundError('The specified resource is not found.'))
    } else if (!CryptoUtil.isValidPassword(payload.password, user.password)) {
      return Promise.reject(new InvalidPasswordError('The specified password is not valid.'))
    }

    const tokens = ModelAuth.generateTokens({ ...user })
    if (!tokens) {
      return Promise.reject(new InputValidationError('Cant generate tokens for this user'))
    }

    // Access and refresh tokens
    const saveTokens = await AuthModel.saveToken(user.id, tokens.refresh_token)
    return {
      user: user,
      refresh_token: saveTokens.refresh_token,
      accessToken: tokens.accessToken
    }
  }

  static async refresh_token(refresh_token) {
    try {
      const validRefreshToken = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET)
      const userData = await AuthModel.findToken(refresh_token)

      if (!validRefreshToken || !userData) {
        return Promise.reject(new ResourceNotFoundError(`The refreshToken for ${refresh_token} is not valid.`))
      }

      const user = await UserModel.getById(userData.id)
      const tokens = AuthModel.generateTokens(user)
      await AuthModel.saveToken(userDto.id, tokens.refresh_token)
      return {
        user,
        refresh_token: tokens.refresh_token,
        accessToken: tokens.accessToken
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
  static async findToken(refresh_token) {
    const userData = await TokenModel.getTokenByRefreshToken(refresh_token)

    if (!userData) {
      return Promise.reject(new ResourceNotFoundError(`The refresh_token for ${refresh_token} is not found.`))
    }

    // const { user } = userData[0]
    // const role = user.role ? user.role.toUpperCase() : 'AGENT'
    // const scopes = ModelAuth.SCOPES
    // userData[0].role = role in scopes ? scopes[role] : scopes.AGENT
    // return userData[0]
    return userData
  }
  static async removeToken(refresh_token) {
    const removeData = await TokenModel.removeTokenByRefreshToken(refresh_token)
    return removeData
  }

  static async logout(refresh_token) {
    try {
      const removeToken = await AuthModel.removeToken(refresh_token)
      if (!removeToken) {
        return Promise.reject(new ResourceNotFoundError(`The refreshToken for ${refresh_token} is not found.`))
      }
      return removeToken
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

module.exports = AuthModel