require('dotenv').config()

module.exports = {
    PSQL: {
        URL: process.env.PSQL_URL || 'jdbc:postgresql://localhost:5432/stylique',
        PORT: process.env.PSQL_PORT || 5432,
        HOST: process.env.PSQL_HOST || 'localhost',
        USER: process.env.PSQL_USER || 'mayro_it',
        DATABASE: process.env.PSQL_DATABASE || 'stylique',
        PASSWORD: process.env.PSQL_PASSWORD || "1qa2ws3ed4rf"
    },
    PORT: process.env.PORT || 3030
}