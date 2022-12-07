// Standard modules
require('dotenv').config()
const http = require('http')


// Modules from this project
const { LoggerUtil } = require('../util')
const App = require('../app')
const { PORT } = require('../config/variable.config')

// Constants
const { name, engines } = require('../../package.json')

const init = async () => {
  App.init()
  const server = http.createServer(App.app)
  const _onListening = () => {
    const address = server.address()
    const bind = typeof address === 'string'
      ? `pipe ${address}`
      : `${address.port}`

    LoggerUtil.info(`${name} started:`)
    LoggerUtil.info(`\tPort: ${bind}`)
    LoggerUtil.info(`\tEnvironment: ${App.env}`)
    LoggerUtil.info(`\tNode version: ${process.version}. Recommended v${engines.node}`)
    LoggerUtil.info(`\tStart date: ${(new Date()).toUTCString()} \n`)
  }
  server.listen(PORT)
  // server.on('error', _onError)
  server.on('listening', _onListening)
}

module.exports = init().catch(console.error)
