const {register, login, setAvatar, getAllUsers} = require('../controllers/userController')

const userRoutes = require('express').Router()

userRoutes.post('/register', register)
userRoutes.post('/login', login)
userRoutes.post('/set-avatar/:id', setAvatar)
userRoutes.get('/all-users/:id',getAllUsers)

module.exports = userRoutes