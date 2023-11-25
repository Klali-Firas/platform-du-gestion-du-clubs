const Material = require('../models/material.model');

class MaterialService {
    async getAllMaterials() {
        try {
            const materials = await Material.find();
            return materials;
        } catch (error) {
            throw new Error('Error fetching materials: ' + error.message);
        }
    }

    async getMaterialById(id) {
        try {
            const material = await Material.findById(id);
            return material;
        } catch (error) {
            throw new Error('Error fetching material by ID: ' + error.message);
        }
    }

    async createMaterial(materialData) {
        try {
            const material = new Material(materialData);
            await material.save();
            return material;
        } catch (error) {
            throw new Error('Error creating material: ' + error.message);
        }
    }

    async updateMaterial(id, updatedData) {
        try {
            const material = await Material.findByIdAndUpdate(id, updatedData, { new: true });
            return material;
        } catch (error) {
            throw new Error('Error updating material: ' + error.message);
        }
    }

    async deleteMaterial(id) {
        try {
            const material = await Material.findByIdAndUpdate(
                id,
                { $set: { etat: false } },
                { new: true } // to return the updated material
            );

            if (!material) {
                throw new Error('Material not found');
            }

            return material;
        } catch (error) {
            throw new Error('Error updating material: ' + error.message);
        }
    }

    async activateMaterial(id) {
        try {
            const material = await Material.findByIdAndUpdate(
                id,
                { $set: { etat: true } },
                { new: true } // to return the updated material
            );

            if (!material) {
                throw new Error('Material not found');
            }

            return material;
        } catch (error) {
            throw new Error('Error updating material: ' + error.message);
        }
    }

}

module.exports = MaterialService;
