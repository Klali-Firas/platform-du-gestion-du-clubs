const Reservation = require('../models/reservation.model');
class reservationService {

  async createReservation(reservationData) {
    try {
      const reservation = await Reservation.create(reservationData);
      return reservation;
    } catch (error) {
      throw new Error('Error creating reservation: ' + error.message);
    }
  }

  async getReservationById(id) {
    try {
      const reservation = await Reservation.findById(id);
      return reservation;
    } catch (error) {
      throw new Error('Error fetching reservation by ID: ' + error.message);
    }
  }
  async getAllReservations() {
    try {
      const reservations = await Reservation.find();
      return reservations;
    } catch (error) {
      throw new Error('Error fetching reservations: ' + error.message);
    }
  }

  async getReservationsByClubId(clubId) {
    try {
      const reservations = await Reservation.find({ clubID: clubId });
      return reservations;
    } catch (error) {
      throw new Error('Error fetching reservations by club ID: ' + error.message);
    }
  }

  async updateReservation(id, newData) {
    try {

      const reservation = await Reservation.findByIdAndUpdate(
        id,
        { $set: newData },
        { new: true }
      );

      return reservation;
    } catch (error) {
      throw new Error('Error updating reservation: ' + error.message);
    }
  }
}
module.exports = reservationService;
