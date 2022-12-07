const { PSQL: {
  PORT, HOST, DATABASE, USER, PASSWORD
} } = require('./src/config/variable.config')

module.exports = {
  development: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      port: PORT,
      host: HOST,
      database: DATABASE,
      user: USER,
      password: PASSWORD
    }
  },
  production: {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      port: PORT,
      host: HOST,
      database: DATABASE,
      user: USER,
      password: PASSWORD
    }
  }
}
