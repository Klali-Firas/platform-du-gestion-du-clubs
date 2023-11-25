const ClubService = require('../services/club.service'); // Adjust the import path
const clubService = new ClubService();
const express = require("express");
const router = express.Router();

// Example usage in a route/controller
router.get('/', async (req, res) => {
  try {
    const clubs = await clubService.getAllClubs();
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const club = await clubService.getClubById(id);
    res.json(club);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Similar routes/controllers for other functionalities

// Example for activating/deactivating a club
router.put('/:id/toggle', async (req, res) => {
  const { id } = req.params;
  const { etat } = req.body;

  try {
    const updatedClub = await clubService.toggleClubActivation(id, etat);
    res.json(updatedClub);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put('/:id/add-role', async (req, res) => {
  const { id } = req.params;
  const { role, isExclusive } = req.body;

  try {
    const updatedClub = await clubService.addRole(id, role, isExclusive);
    res.json(updatedClub);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/:id/roles', async (req, res) => {
  const { id } = req.params;
  try {
    const club = await clubService.getClubRoles(id);
    const roles = club ? club.roles : [];
    const exclusiveRoles = club ? club.exclusiveRoles : [];
    res.json({ roles, exclusiveRoles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;