const { Schema, model } = require("mongoose");



const moment = require('moment-timezone');

const DemandeSchema = new Schema({
  clubID: String,
  objet: String,
  description: String,
  etat: {
    type: String,
    enum: ["accepter", "refuser", "en cours"],
    default: "en cours", 
  },
 dateDem: { 
    type: Date, 
    default: () => moment.utc().add(1, 'hours').toDate()
  },
  reponse:String
});

const Demande = model("Demande", DemandeSchema);

module.exports = Demande;
