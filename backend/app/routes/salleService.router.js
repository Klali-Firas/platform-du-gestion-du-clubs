const express = require('express');
const router = express.Router();
const SalleService = require('../services/salle.service');
const salleService = new SalleService();

router.get('/', async (req, res) => {
    try {
        const salles = await salleService.getAllSalles();
        res.json(salles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const salle = await salleService.getSalleById(id);
        res.json(salle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const salleData = req.body;
    try {
        const salle = await salleService.createSalle(salleData);
        res.status(201).json(salle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const salle = await salleService.updateSalle(id, updatedData);
        res.json(salle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/desactivate', async (req, res) => {
    const { id } = req.params;
    try {
        console.log(id)
        const salle = await salleService.deleteSalle(id);
        res.json(salle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/:id/activate', async (req, res) => {
    const { id } = req.params;
    try {
        const salle = await salleService.activateSalle(id);
        res.json(salle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
