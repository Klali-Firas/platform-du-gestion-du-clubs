
const express = require("express");
const router = express.Router();
const clubService = require('./clubService.router');
const memberService = require('./memberService.router');
const demandeService = require('./demandeService.router');
const reservationService = require('./reservationService.router');
const materialRoutes = require('./materialService.router');
const salleRoutes = require('./salleService.router')
const standRoutes = require('./standService.router')
const chatRoutes = require('./chatService.router')
const annoncesRoutes = require('./annonceService.router')

// Example usage in a route/controller
router.use('/clubs', clubService);
router.use('/members', memberService);
router.use('/demandes', demandeService);
router.use('/reservations', reservationService)
router.use('/materials', materialRoutes);
router.use('/salles', salleRoutes);
router.use('/stands', standRoutes);
router.use('/chat', chatRoutes);
router.use('/annonces', annoncesRoutes);


module.exports = router;