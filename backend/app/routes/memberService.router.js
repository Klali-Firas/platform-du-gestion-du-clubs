// member.router.js

const express = require('express');
const MemberService = require('../services/member.service');
const memberService = new MemberService();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const members = await memberService.getAllMembers();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const member = await memberService.getMemberById(id);
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const memberData = req.body;
  try {
    const createdMember = await memberService.createMember(memberData);
    res.json(createdMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const memberData = req.body;
  try {
    const updatedMember = await memberService.updateMember(id, memberData);
    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMember = await memberService.deleteMember(id);
    res.json(deletedMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/by-club/:clubId', async (req, res) => {
  const { clubId } = req.params;
  try {
    const members = await memberService.getMembersByClubId(clubId);
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id/delete-from-club/:clubId', async (req, res) => {
  const id = req.params.id;
  const clubId = req.params.clubId;
  try {
    const updatedMember = await memberService.deleteMemberFromClub(id, clubId);
    res.json(updatedMember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.put('/:id/update-role-in-club/:clubId', async (req, res) => {
//   const { id, clubId } = req.params;
//   const { newRole } = req.body;
//   try {
//     const updatedMember = await memberService.updateMemberRoleInClub(id, clubId, newRole);
//     res.json(updatedMember);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

router.post('/add-role', async (req, res) => {
  const { clubId, memberId, role } = req.body;
  try {
    const result = await memberService.addRoleToMember(clubId, memberId, role);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
