const mongoose = require("mongoose");

const Salle = mongoose.model(
  "Salle",
  new mongoose.Schema({
    label: String,
    etat: {
      type: Boolean,
      default: true,
    },
  })
);

module.exports = Salle;