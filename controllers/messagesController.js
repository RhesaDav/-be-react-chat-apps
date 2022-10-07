const Messages = require('../models/messageModel')

module.exports.addMessage = async (req,res,next) => {
    try {
        const { from, to, message } = req.body
        const data = await Messages.create({
            message: {text: message},
            users: [from, to],
            sender: from
        });
        if (data) return res.json({ message: "Message added success" })
        return res.json({ message: "Failed to send message" })
    } catch (error) {
        next(error)
    }
}

module.exports.getAllMessages = async (req,res,next) => {
    try {
        const {from, to} = req.body
        const messages = await Messages.find({
            users: {
                $all: [from,to]
            },
        }).sort({updatedAt: 1});
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }
        })
        res.json(projectMessages)
    } catch (error) {
        next(error)
    }
}