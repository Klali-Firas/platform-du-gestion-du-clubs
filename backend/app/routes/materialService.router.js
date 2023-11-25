const express = require('express');
const router = express.Router();
const MaterialService = require('../services/material.service');
const materialService = new MaterialService();

router.get('/', async (req, res) => {
    try {
        const materials = await materialService.getAllMaterials();
        res.json(materials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const material = await materialService.getMaterialById(id);
        res.json(material);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const materialData = req.body;
    try {
        const material = await materialService.createMaterial(materialData);
        res.status(201).json(material);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const material = await materialService.updateMaterial(id, updatedData);
        res.json(material);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id/desactivate', async (req, res) => {
    const { id } = req.params;
    try {
        const material = await materialService.deleteMaterial(id);
        res.json(material);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/:id/activate', async (req, res) => {
    const { id } = req.params;

    try {
        const material = await materialService.activateMaterial(id);
        res.json(material);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
