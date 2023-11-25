const Salle = require('../models/salle.model');

class SalleService {
    async getAllSalles() {
        try {
            const salles = await Salle.find();
            return salles;
        } catch (error) {
            throw new Error('Error fetching salles: ' + error.message);
        }
    }

    async getSalleById(id) {
        try {
            const salle = await Salle.findById(id);
            return salle;
        } catch (error) {
            throw new Error('Error fetching salle by ID: ' + error.message);
        }
    }

    async createSalle(salleData) {
        try {
            const salle = new Salle(salleData);
            await salle.save();
            return salle;
        } catch (error) {
            throw new Error('Error creating salle: ' + error.message);
        }
    }

    async updateSalle(id, updatedData) {
        try {
            const salle = await Salle.findByIdAndUpdate(id, updatedData, { new: true });
            return salle;
        } catch (error) {
            throw new Error('Error updating salle: ' + error.message);
        }
    }

    async deleteSalle(id) {

        try {

            const salle = await Salle.findByIdAndUpdate(
                id,
                { $set: { etat: false } },
                { new: true } // to return the updated salle
            );

            if (!salle) {
                throw new Error('Salle not found');
            }

            return salle;
        } catch (error) {
            throw new Error('Error updating salle: ' + error.message);
        }
    }

    async activateSalle(id) {
        try {
            const salle = await Salle.findByIdAndUpdate(
                id,
                { $set: { etat: true } },
                { new: true } // to return the updated salle
            );

            if (!salle) {
                throw new Error('Salle not found');
            }

            return salle;
        } catch (error) {
            throw new Error('Error updating salle: ' + error.message);
        }
    }
}

module.exports = SalleService;
