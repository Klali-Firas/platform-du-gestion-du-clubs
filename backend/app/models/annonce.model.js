const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    objet: String,
    description: String,
    dateAnnonce: { type: Date, default: Date.now }

});

const Annonce = mongoose.model("Annonce", ChatSchema);

module.exports = Annonce;