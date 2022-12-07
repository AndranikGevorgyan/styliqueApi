// NPM Modules
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const fileUpload = require('express-fileupload')

const PSQLStorage = require('./storage/psql.storage')

const ErrorHandlerMiddleware = require('./middleware/error-handler.middleware')

const PackageJson = require('../package.json')
const Api = require('./router')

class App {
      /**
       * @constructor
       */
      constructor() {
            this.app = express()
            this.env = this.app.get('env')
            this.port = process.env.PORT
      }

      /**
       * @description Initialize the App.
       */
      async init() {
            await App._initializeStorage()
            this._setRequestParser()
            this._initializeApi()
            this._setErrorHandler()
            this._setFileUpload()
      }

      _setRequestParser() {
            const options = { limit: '200mb', extended: false }
            this.app.use(bodyParser.urlencoded(options))
            this.app.use(bodyParser.json())
            this.app.use(cookieParser())
      }

      static _initializeStorage() {
            return PSQLStorage.init()
      }

      _initializeApi() {
            this.app.use('/api/v1', Api)
      }

      _setFileUpload() {
            this.app.use(fileUpload({
                  limits: {
                        fileSize: 10000000,
                  },
                  abortOnLimit: true,
            })
            );
      }

      _setErrorHandler() {
            this.app.use(ErrorHandlerMiddleware.init)
      }
}

module.exports = new App()