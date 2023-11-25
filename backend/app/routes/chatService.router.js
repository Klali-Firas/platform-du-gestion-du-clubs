const express = require('express');
const router = express.Router();
const ChatService = require('../services/chat.service');
const chatService = new ChatService();

router.get('/getAllChats', async (req, res) => {


    try {
        const chats = await chatService.getAllChats();
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new chat
router.post('/createChat', async (req, res) => {
    const { clubId, clubName } = req.body;
    try {
        const chat = await chatService.createChat(clubId, clubName);
        res.json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get an existing chat
router.get('/getChat', async (req, res) => {
    const { clubId } = req.query;
    try {
        const chat = await chatService.getChat(clubId);
        res.json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new message to a chat
router.post('/addMessage', async (req, res) => {
    const { clubId, content, senderIsAdmin } = req.body;
    try {
        const chat = await chatService.addMessage(clubId, content, senderIsAdmin);
        res.json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
