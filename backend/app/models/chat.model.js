const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    clubName: String,
    club: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: [{ message: String, isAdmin: Boolean, timestamp: { type: Date, default: Date.now } }],

});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;