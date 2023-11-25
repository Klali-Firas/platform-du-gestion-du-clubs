const mongoose = require("mongoose");

const Material = mongoose.model(
  "Material",
  new mongoose.Schema({
    label: String,
    etat: {
      type: Boolean,
      default: true,
    },
  })
);

module.exports = Material;