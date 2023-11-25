const express = require('express');
const router = express.Router();
const DemandeService = require('../services/demande.service'); // Adjust the import path
const demandeService = new DemandeService();

// Example usage in a route/controller
router.get('/', async (req, res) => {
  try {
    const demandes = await demandeService.getAllDemandes();
    res.json(demandes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/by-club/:clubID', async (req, res) => {
  const { clubID } = req.params;
  try {
    const demandes = await demandeService.getDemandesByClubID(clubID);
    res.json(demandes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const demandeData = req.body;
  try {

    const demande = await demandeService.createDemande(demandeData);
    res.status(201).json(demande);
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const demande = await demandeService.updateDemande(id, updatedData);
    res.json(demande);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get Demande By ID
router.get('/:demandeId', async (req, res) => {
  const demandeId = req.params.demandeId;

  try {
    const demande = await demandeService.getDemandeById(demandeId);

    if (!demande) {
      return res.status(404).json({ message: 'Demande not found' });
    }

    res.status(200).json(demande);
  } catch (error) {
    res.status(500).json({ message: 'Error getting demande by ID', error: error.message });
  }
});


module.exports = router;
