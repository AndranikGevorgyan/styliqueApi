const http = require('http')

const { HttpStatusCodesUtil } = require('../util')

class ErrorHandlerMiddleware {
    /**
     * @param {Object} error
     * @param {Object} request
     * @param {Object} response
     * @param {Function} next
     * @description Initialize error handler.
     */
    static init(error, request, response, next) {
        const ERROR_CASE =
            ErrorHandlerMiddleware.ERROR_CASES[error.status] ||
            ErrorHandlerMiddleware.ERROR_CASES[error.code] ||
            ErrorHandlerMiddleware.ERROR_CASES[error.name] ||
            ErrorHandlerMiddleware.ERROR_CASES.DEFAULT

        const { status, code, message } = ERROR_CASE

        const result = { status, code, message: message || error.message, data: error.data }
        console.log('-------', result)

        // temp. log to explore and add more cases.
        result.status === 500 && console.log('Case: ', error.status, error.code, error.name, error.message)
        if (result.status >= 500) console.log(error)

        response.status(result.status).json(result)
    }
}

ErrorHandlerMiddleware.ERROR_CASES = {
    ExpiredTokenConfirmError: {
        status: HttpStatusCodesUtil.BAD_REQUEST,
        code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
    },
    ExpiredEmailConfirmError: {
        status: HttpStatusCodesUtil.BAD_REQUEST,
        code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
    },
    InputValidationError: {
        status: HttpStatusCodesUtil.BAD_REQUEST,
        code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
    },
    InvalidEmailConfirmError: {
        status: HttpStatusCodesUtil.BAD_REQUEST,
        code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
    },
    InvalidPasswordError: {
        status: HttpStatusCodesUtil.BAD_REQUEST,
        code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
    },
    SyntaxError: { // body-parser
        status: HttpStatusCodesUtil.BAD_REQUEST,
        code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST]
    },

    UniqueViolationError: { // postgresql
        status: HttpStatusCodesUtil.BAD_REQUEST,
        code: http.STATUS_CODES[HttpStatusCodesUtil.BAD_REQUEST],
        message: 'Duplicate entry.'
    },

    Forbidden: {
        status: HttpStatusCodesUtil.FORBIDDEN,
        code: http.STATUS_CODES[HttpStatusCodesUtil.FORBIDDEN]
    },
    ForbiddenError: {
        status: HttpStatusCodesUtil.FORBIDDEN,
        code: http.STATUS_CODES[HttpStatusCodesUtil.FORBIDDEN]
    },
    PermissionError: {
        status: HttpStatusCodesUtil.FORBIDDEN,
        code: http.STATUS_CODES[HttpStatusCodesUtil.FORBIDDEN]
    },
    ResourceNotFoundError: {
        status: HttpStatusCodesUtil.NOT_FOUND,
        code: http.STATUS_CODES[HttpStatusCodesUtil.NOT_FOUND]
    },
    ConflictError: {
        status: HttpStatusCodesUtil.CONFLICT,
        code: http.STATUS_CODES[HttpStatusCodesUtil.CONFLICT]
    },
    DEFAULT: {
        status: HttpStatusCodesUtil.INTERNAL_SERVER_ERROR,
        code: http.STATUS_CODES[HttpStatusCodesUtil.INTERNAL_SERVER_ERROR],
        message: 'The server encountered an internal error. Try again later.'
    }
}

module.exports = ErrorHandlerMiddleware
