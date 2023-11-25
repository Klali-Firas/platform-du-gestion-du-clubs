const Stand = require('../models/stand.model');

class StandService {
    async getAllStands() {
        try {
            const stands = await Stand.find();
            return stands;
        } catch (error) {
            throw new Error('Error fetching stands: ' + error.message);
        }
    }

    async getStandById(id) {
        try {
            const stand = await Stand.findById(id);
            return stand;
        } catch (error) {
            throw new Error('Error fetching stand by ID: ' + error.message);
        }
    }

    async createStand(standData) {
        try {
            const stand = new Stand(standData);
            await stand.save();
            return stand;
        } catch (error) {
            throw new Error('Error creating stand: ' + error.message);
        }
    }

    async updateStand(id, updatedData) {
        try {
            const stand = await Stand.findByIdAndUpdate(id, updatedData, { new: true });
            return stand;
        } catch (error) {
            throw new Error('Error updating stand: ' + error.message);
        }
    }

    async deleteStand(id) {
        try {
            const material = await Stand.findByIdAndUpdate(
                id,
                { $set: { etat: false } },
                { new: true } // to return the updated material
            );

            if (!material) {
                throw new Error('Stand not found');
            }

            return material;
        } catch (error) {
            throw new Error('Error updating material: ' + error.message);
        }
    }

    async activateStand(id) {
        try {
            const material = await Stand.findByIdAndUpdate(
                id,
                { $set: { etat: true } },
                { new: true } // to return the updated material
            );

            if (!material) {
                throw new Error('Stand not found');
            }

            return material;
        } catch (error) {
            throw new Error('Error updating material: ' + error.message);
        }
    }
}

module.exports = StandService;
