const express = require('express');
const router = express.Router();
const StandService = require('../services/stand.service');
const standService = new StandService();

router.get('/', async (req, res) => {
    try {
        const stands = await standService.getAllStands();
        res.json(stands);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const stand = await standService.getStandById(id);
        res.json(stand);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const standData = req.body;
    try {
        const stand = await standService.createStand(standData);
        res.status(201).json(stand);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    try {
        const stand = await standService.updateStand(id, updatedData);
        res.json(stand);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/desactivate', async (req, res) => {
    const { id } = req.params;
    try {
        const stand = await standService.deleteStand(id);
        res.json(stand);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/:id/activate', async (req, res) => {
    const { id } = req.params;
    try {
        const stand = await standService.activateStand(id);
        res.json(stand);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
