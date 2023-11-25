const Club = require('../models/club.model'); // Adjust the import path

class ClubService {
  // Get all clubs (excluding password field)
  async getAllClubs() {
    try {
      const clubs = await Club.find({ isAdmin: false }, { password: 0, isAdmin: 0 }); // Exclude password field
      return clubs;
    } catch (error) {
      throw new Error('Error fetching clubs: ' + error.message);
    }
  }

  // Get club by ID (excluding password field)
  async getClubById(id) {
    try {
      const club = await Club.findById(id, { isAdmin: false, password: 0, isAdmin: 0 }); // Exclude password field
      return club;
    } catch (error) {
      throw new Error('Error fetching club by ID: ' + error.message);
    }
  }

  // Get club by name (excluding password field)
  async getClubByName(clubName) {
    try {
      const club = await Club.findOne({ clubName, isAdmin: false }, { password: 0, isAdmin: 0 }); // Exclude password field
      return club;
    } catch (error) {
      throw new Error('Error fetching club by name: ' + error.message);
    }
  }

  // Activate or deactivate club by ID (excluding password field)
  async toggleClubActivation(id, etat) {
    try {
      const club = await Club.findByIdAndUpdate(
        id,
        { $set: { etat }, },
        { new: true }
      ); // Exclude password field
      return club;
    } catch (error) {
      throw new Error('Error toggling club activation: ' + error.message);
    }
  }
  async addRole(clubId, role, isExclusive = false) {
    try {
      const updateField = isExclusive ? 'exclusiveRoles' : 'roles';

      const club = await Club.findByIdAndUpdate(
        clubId,
        { $addToSet: { [updateField]: role } },
        { new: true }
      );

      return club;
    } catch (error) {
      throw new Error('Error adding role to club: ' + error.message);
    }
  }

  async getClubRoles(clubId) {
    try {
      const club = await Club.findById(clubId, { roles: 1, exclusiveRoles: 1, _id: 0 }); // Only fetch roles field
      return club;
    } catch (error) {
      throw new Error('Error fetching club roles: ' + error.message);
    }
  }
}



module.exports = ClubService;
