
const ERRORS_NAME = [
  'ExpiredEmailConfirmError',
  'ExpiredTokenConfirmError',
  'ConflictError',
  'Forbidden',
  'PermissionError',
  'InputValidationError',
  'InvalidEmailConfirmError',
  'InvalidPasswordError',
  'MicroserviceError',
  'ResourceNotFoundError',
  'NotAuthorizedError'
]
const ERRORS = ERRORS_NAME.reduce((acc, className) => {
  acc[className] = ({
    [className]: class extends Error {
      constructor(msg, status) {
        super()
        this.message = msg
        this.status = status
        this.name = this.constructor.name
      }
    }
  })[className]

  return acc
}, {})

module.exports = ERRORS