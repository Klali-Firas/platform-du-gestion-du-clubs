// routes/annonce.route.js
const express = require('express');
const router = express.Router();
const AnnonceService = require('../services/annonce.service');

const annonceService = new AnnonceService();

router.post('/create', async (req, res) => {
    const { objet, description } = req.body;
    try {
        const annonce = await annonceService.createAnnonce(objet, description);
        res.json(annonce);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/getAnnonces', async (req, res) => {
    try {
        const annonces = await annonceService.getAnnonces();
        res.json(annonces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
