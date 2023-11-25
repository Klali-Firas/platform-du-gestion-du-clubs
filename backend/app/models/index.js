const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;


db.club = require("./club.model");
db.demande = require("./demande.model");
db.material = require("./material.model");
db.member = require("./member.model");
db.reserrvation = require("./reservation.model");
db.salle = require("./salle.model");

module.exports = db;