require('dotenv').config()
const ModelAuth = require('./auth_model')
const { SuccessHandlerUtil, ErrorUtil: { PermissionError } } = require('../util')

class MiddlewareAuth {
  static async authenticate(request, response, next) {
    try {
      if (!request.headers.authorization || !request.headers.authorization.split(' ')[1]) {
        throw new PermissionError('0');
      }
      const accessToken = request.headers.authorization.split(' ')[1];
      const data = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
      if (!data) {
        throw new PermissionError('1');
      }

      const { refresh_token } = JSON.parse(request.cookies.userCookie);
      if (!refresh_token) {
        throw new PermissionError('2');
      }
      const userData = await ModelAuth.findToken(refresh_token);

      if (!userData) {
        throw new PermissionError('3');
      }

      response.locals.auth = userData;
      next();
    } catch (error) {
      next(error);
    }
  }
  /**
     * @param {Object} request
     * @param {Object} response
     * @param {Function} next
     * @description Authenticate For Scopes.
     */
  static authenticateFor(accessScopes) {
    const access = accessScopes.map(u => 'access:' + u)
    return async function (request, response, next) {
      try {
        if (!request.headers.authorization || !request.headers.authorization.split(' ')[1]) {
          throw new PermissionError('0')
        }
        const accessToken = request.headers.authorization.split(' ')[1]
        const data = jwt.verify(accessToken, JWT_ACCESS_SECRET)
        if (!data) {
          throw new PermissionError('1')
        }
        const { refresh_token } = JSON.parse(request.cookies.userCookie)
        if (!refresh_token) {
          throw new PermissionError('2')
        }
        const userData = await ModelAuth.findToken(refresh_token)
        console.log(userData.role.name);
        if (!userData || access.includes(userData.role.name)) {
          throw new PermissionError('3')
        }

        next()
      } catch (error) {
        next(error)
      }
    }
  }


  static async refresh_token(request, response, next) {
    try {
      const { refresh_token } = JSON.parse(request.cookies.userCookie);
      if (!refresh_token) {
        throw new PermissionError();
      }

      const payload = await ModelAuth.refresh_token(refresh_token);
      const newRefreshToken = payload.refresh_token;
      const { role_id } = payload.user;
      const userCookie = JSON.stringify({
        refresh_token: newRefreshToken,
        role_id
      });

      response.cookie('userCookie', userCookie, { maxAge: JWT_REFRESH_TOKEN_FOR_COOKIE_LIFETIME, httpOnly: true });
      SuccessHandlerUtil.handleGet(response, next, payload);
    } catch (error) {
      next(error);
    }
  }
  static async loginUser(request, response, next) {
    try {
      const payload = { ...request.body };
      const user = await ModelAuth.login(payload);

      const { refresh_token } = user;
      const { role_id } = user.user;
      const userCookie = JSON.stringify({
        refresh_token,
        role_id
      });

      response.cookie('userCookie', userCookie, { maxAge: JWT_REFRESH_TOKEN_FOR_COOKIE_LIFETIME, httpOnly: true });
      SuccessHandlerUtil.handleAdd(response, next, user);
    } catch (error) {
      next(error);
    }
  }

  static async logoutUser(request, response, next) {
    try {
      const { refresh_token } = JSON.parse(request.cookies.userCookie)
      if (!refresh_token) {
        throw new PermissionError()
      }
      const removeToken = await ModelAuth.logout(refresh_token)
      if (removeToken) {
        response.clearCookie('refresh_token')
        SuccessHandlerUtil.handleUpdate(response, next, { success: true })
      }
    } catch (error) {
      next(error)
    }
  }

}

module.exports = MiddlewareAuth