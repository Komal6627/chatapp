import Message from "../model/messageModel.js";

export const addMessage = async(req, res, next) => {
    try {
        const {from, to, message} = req.body;
        const data = await Message.create({
            message:{text:message},
            users: [from, to],
            sender: from,
        });
        if (data) return res.json({msg: "Message added succesfully"})
        return res.json({msg:"Failed to add message to database"})
    } catch (ex) {
        next(ex)
    }
}


export const getAllMessage  = async(req, res, next) => {
    try {
        const {from, to} = req.body;
        const message = await Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updateAt: 1 });

        const projectMessage = message.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            }
        })
        res.json(projectMessage);
    } catch (ex) {
        next(ex)
    }
}