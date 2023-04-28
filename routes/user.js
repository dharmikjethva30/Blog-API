const express = require('express')
const user_route = express.Router()

const { signup, login, logout } = require('../controllers/user')
const auth = require('../middlewares/auth')

user_route.post('/signup', signup)
user_route.post('/login', login)
user_route.get('/logout', auth, logout)

module.exports = user_route
