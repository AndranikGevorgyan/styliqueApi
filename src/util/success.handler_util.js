const { ResourceNotFoundError } = require('./error_util')
let stream = require('stream')

const { HttpStatusCodesUtil } = require('../util')

class SuccessHandlerUtil {
  static handleTokenVerification (response, next, result) {
    return SuccessHandlerUtil._sendResponse(response, HttpStatusCodesUtil.OK, result)
  }
  /**
   * @param {Object} response
   * @param {number} status
   * @param {Object} [data]
   * @description Send response.
   */
  static _sendResponse (response, status, data) {
    response.status(status).json(data)
  }

  /**
   * @param {Object} res
   * @param {Function} next
   * @param {Array} result
   * @description Handle `list` type requests.
   */
  static handleList (res, next, result) {
    SuccessHandlerUtil._sendResponse(res, HttpStatusCodesUtil.OK, result)
  }

  /**
   * @param {Object} response
   * @param {Function} next
   * @param {Object} result
   * @description Handle 'add' type requests.
   */
  static handleAdd (response, next, result) {
    if (!result) {
      return SuccessHandlerUtil._sendResponse(response, HttpStatusCodesUtil.NO_CONTENT)
    }

    SuccessHandlerUtil._sendResponse(response, HttpStatusCodesUtil.CREATED, result)
  }

  /**
   * @param {Object} response
   * @param {Function} next
   * @param {Object} result
   * @description Handle `get` type requests.
   */
  static handleGet (response, next, result) {
    if (!result) {
      return next(new ResourceNotFoundError('The specified resource is not found.'))
    }

    SuccessHandlerUtil._sendResponse(response, HttpStatusCodesUtil.OK, result)
  }

  static handleUpdate (response, next, result) {
    if (!result) {
      return SuccessHandlerUtil._sendResponse(response, HttpStatusCodesUtil.NO_CONTENT)
    }

    SuccessHandlerUtil._sendResponse(response, HttpStatusCodesUtil.OK, result)
  }
}

module.exports = SuccessHandlerUtil
