// services/annonce.service.js
const Annonce = require('../models/annonce.model');

class AnnonceService {
    async createAnnonce(objet, description) {
        try {
            const annonce = new Annonce({
                objet,
                description,
            });
            await annonce.save();
            return annonce;
        } catch (error) {
            throw new Error('Error creating annonce: ' + error.message);
        }
    }

    async getAnnonces() {
        try {
            const annonces = await Annonce.find();
            return annonces;
        } catch (error) {
            throw new Error('Error getting annonces: ' + error.message);
        }
    }
}

module.exports = AnnonceService;
