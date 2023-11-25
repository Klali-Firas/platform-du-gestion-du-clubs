const { Schema, model } = require("mongoose");
const moment = require('moment-timezone');

const ReservationSchema = new Schema({
  clubID: String,
  label: String,
  reference: {
    type: Schema.Types.ObjectId,
    refPath: 'onModel'
  },
  onModel: {
    type: String,
    enum: ['Material', 'Salle', 'Stand']
  },
  objet: String,
  description: String,
  reponse: String,
  etat: {
    type: String,
    enum: ["accepter", "refuser", "en cours"],
    default: "en cours",
  },
  dateRecu: {
    type: Date,
    default: () => moment.utc().add(1, 'hours').toDate()
  },
  dateDeb: { type: Date, required: true },
  dateFin: { type: Date, required: true },
});

ReservationSchema.pre('save', async function (next) {
  try {
    const modelName = this.onModel;
    const referencedObject = await model(modelName).findById(this.reference);
    if (referencedObject) {
      this.label = referencedObject.label;
    }
    next();
  } catch (error) {
    next(error);
  }
});
const Reservation = model("Reservation", ReservationSchema);

module.exports = Reservation;
