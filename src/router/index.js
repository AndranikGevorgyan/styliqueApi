const express = require('express')
const app = express()

const auth = require('./auth_router')
const user = require('./user_router')
const article = require('./article_router')
const category = require('./category_router')


app.use('/auth', auth)
app.use('/user', user)
app.use('/article', article)
app.use('/category', category)

module.exports = app