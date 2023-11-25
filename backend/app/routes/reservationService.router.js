const express = require('express');
const router = express.Router();
const ReservationFunctions = require('../services/reservation.service');
const reservationFunctions = new ReservationFunctions();


//Get all reservations

router.get('/get-all-reservations', async (req, res) => {
  try {
    const reservation = await reservationFunctions.getAllReservations();
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get reservation by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await reservationFunctions.getReservationById(id);
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get reservations by club ID
router.get('/by-club/:clubId', async (req, res) => {
  const { clubId } = req.params;
  try {
    const reservations = await reservationFunctions.getReservationsByClubId(clubId);
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update reservation etat by ID
router.put('/:id/update-etat', async (req, res) => {
  const { id } = req.params;
  const { updatedData } = req.body;

  try {
    const updatedReservation = await reservationFunctions.updateReservation(id, updatedData);
    res.json(updatedReservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// create
router.post('/', async (req, res) => {
  const reservationData = req.body;
  try {
    const reservation = await reservationFunctions.createReservation(reservationData);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
