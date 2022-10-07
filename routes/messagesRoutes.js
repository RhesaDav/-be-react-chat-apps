const { addMessage, getAllMessages } = require('../controllers/messagesController')

const messagesRoutes = require('express').Router()

messagesRoutes.post('/add-msg', addMessage)
messagesRoutes.post('/get-messages', getAllMessages)

module.exports = messagesRoutes