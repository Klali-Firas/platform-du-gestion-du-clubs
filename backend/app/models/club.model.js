const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
  clubName: String,
  clubDescription: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  tel: Number,
  etat: { type: Boolean, default: true },
  isAdmin: { type: Boolean, default: false },
  roles: [String],
  exclusiveRoles: [String]

});

const Club = mongoose.model("Club", ClubSchema);

module.exports = Club;
