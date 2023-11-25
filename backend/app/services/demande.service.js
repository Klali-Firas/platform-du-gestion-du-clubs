const Demande = require('../models/demande.model'); // Adjust the import path

class DemandeService {
  // Get all demandes
  async getAllDemandes() {
    try {
      const demandes = await Demande.find();
      return demandes;
    } catch (error) {
      throw new Error('Error fetching demandes: ' + error.message);
    }
  }

  // Get demandes by club ID
  async getDemandesByClubID(clubID) {
    try {
      const demandes = await Demande.find({ clubID });
      return demandes;
    } catch (error) {
      throw new Error('Error fetching demandes by club ID: ' + error.message);
    }
  }

  // Create a new demande
  async createDemande(demandeData) {
    try {
      const demande = new Demande(demandeData);
      await demande.save();
      return demande;
    } catch (error) {
      throw new Error('Error creating demande: ' + error.message);
    }
  }

  // Update a demande (update response and etat fields)
  async updateDemande(id, updatedData) {
    try {
      const demande = await Demande.findByIdAndUpdate(
        id,
        { $set: updatedData },
        { new: true }
      );
      return demande;
    } catch (error) {
      throw new Error('Error updating demande: ' + error.message);
    }
  }
  async getDemandeById(demandeId) {
    try {
      const demande = await Demande.findById(demandeId);
      return demande;
    } catch (error) {
      throw new Error('Error fetching demande by ID: ' + error.message);
    }
  }
}

module.exports = DemandeService;
