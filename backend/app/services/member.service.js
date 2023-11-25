// member.service.js

const Member = require('../models/member.model');
const Club = require('../models/club.model');

class MemberService {
  async getAllMembers() {
    try {
      const members = await Member.find();
      return members;
    } catch (error) {
      throw new Error('Error fetching members: ' + error.message);
    }
  }

  async getMemberById(id) {
    try {
      const member = await Member.findById(id);
      return member;
    } catch (error) {
      throw new Error('Error fetching member by ID: ' + error.message);
    }
  }

  async createMember(memberData) {
    const { email, roles } = memberData;

    try {
      // Check if an exclusive role is already assigned to another member in the same club
      const clubMembers = await Member.find({ 'roles.clubId': roles[0].clubId });

      const existingExclusiveRole = clubMembers.find((m) =>
        m.roles.some((r) => r.isExclusive && r.clubId === roles[0].clubId && r.role === roles[0].role)
      );


      if (existingExclusiveRole) {
        throw new Error(
          `Exclusive role '${roles[0].role}' for club '${roles[0].clubId}' is already assigned to another member.`
        );
      }

      let member = await Member.findOne({ email });

      if (member) {
        const { clubId, role, isExclusive } = roles[0];

        // Member with the provided email already exists
        const existingRoleIndex = member.roles.findIndex(
          (r) => r.clubId === clubId
          // && !r.isExclusive
        );

        if (existingRoleIndex !== -1) {

          // Update the non-exclusive role for the existing clubId
          member.roles[existingRoleIndex].role = role;
          member.roles[existingRoleIndex].isExclusive = isExclusive;
        } else {
          // ClubId doesn't exist in roles, add the new role
          member.roles.push(...roles);
        }

        await member.save();
      } else {
        // Member with the provided email doesn't exist, create a new member
        member = new Member(memberData);
        await member.save();
      }

      return member;
    } catch (error) {
      throw new Error('Error creating/updating member: ' + error.message);
    }
  }




  async updateMember(id, memberData) {
    try {
      const member = await Member.findByIdAndUpdate(id, memberData, { new: true });
      return member;
    } catch (error) {
      throw new Error('Error updating member: ' + error.message);
    }
  }

  async deleteMember(id) {
    try {
      const member = await Member.findByIdAndDelete(id);
      return member;
    } catch (error) {
      throw new Error('Error deleting member: ' + error.message);
    }
  }

  async getMembersByClubId(clubId) {
    try {
      const members = await Member.find({ 'roles.clubId': clubId });
      return members;
    } catch (error) {
      throw new Error('Error fetching members by club ID: ' + error.message);
    }
  }

  async deleteMemberFromClub(memberId, clubId) {
    try {

      const member = await Member.findByIdAndUpdate(
        memberId,
        {
          $pull: { roles: { clubId: clubId } }
        },
        { new: true }
      );
      return member;

    } catch (error) {
      throw new Error('Error deleting member from club: ' + error.message);
    }
  }

  // async updateMemberRoleInClub(memberId, clubId, newRole) {
  //   try {
  //     const member = await Member.findOneAndUpdate(
  //       { _id: memberId, 'roles.clubId': clubId },
  //       { $set: { 'roles.$.role': newRole } },
  //       { new: true }
  //     );
  //     return member;
  //   } catch (error) {
  //     throw new Error('Error updating member role in club: ' + error.message);
  //   }
  // }

  async addRoleToMember(clubId, memberId, role) {
    try {
      const club = await Club.findById(clubId);
      const member = await Member.findById(memberId);

      if (!club || !member) {
        throw new Error('Club or member not found');
      }

      // Check if the role is exclusive
      if (club.exclusiveRoles.includes(role)) {
        // Check if another member already has this exclusive role
        const memberWithRole = await Member.findOne({ _id: { $ne: memberId }, 'roles.role': role });
        if (memberWithRole) {
          throw new Error('This role is exclusive and already assigned to another member.');
        }
      }

      // Add the role to the member
      member.roles.push({ clubId: clubId, role: role });
      await member.save();

      return member;
    } catch (error) {
      throw new Error(`Error adding role to member: ${error.message}`);
    }
  }
}

module.exports = MemberService;
