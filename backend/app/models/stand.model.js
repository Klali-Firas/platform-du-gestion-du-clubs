const mongoose = require("mongoose");

const Stand = mongoose.model(
    "Stand",
    new mongoose.Schema({
        label: String,
        etat: {
            type: Boolean,
            default: true,
        },
    })
);

module.exports = Stand;