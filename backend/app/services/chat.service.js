const Chat = require('../models/chat.model');

class ChatService {
    async getAllChats() {
        try {
            const chats = await Chat.find();

            return chats;
        } catch (error) {
            throw new Error('Error getting chat: ' + error.message);
        }
    }

    async createChat(clubId, clubName) {
        try {

            const chat = new Chat({
                club: clubId,
                clubName
            });
            await chat.save();
            return chat;
        } catch (error) {
            throw new Error('Error creating chat: ' + error.message);
        }
    }
    async getChat(clubId) {
        try {
            const chat = await Chat.findOne({ club: clubId });
            if (!chat) {
                throw new Error('Chat Doesnt Exist!');
            }
            return chat;
        } catch (error) {
            throw new Error('Error getting chat: ' + error.message);
        }
    }

    async addMessage(clubId, content, senderIsAdmin) {
        try {
            const chat = await Chat.findOne({ club: clubId });
            if (!chat) {
                throw new Error('Chat not found');
            }

            chat.content.push({ message: content, isAdmin: senderIsAdmin });
            await chat.save();
            return chat;
        } catch (error) {
            throw new Error('Error adding message: ' + error.message);
        }
    }
}


module.exports = ChatService;