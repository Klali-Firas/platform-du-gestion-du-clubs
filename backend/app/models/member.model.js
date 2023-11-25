const mongoose = require("mongoose");

const MemberSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  gender: String,
  roles: [{
    clubId: String,
    role: String,
    isExclusive: Boolean,
  }],
});

const Member = mongoose.model("Member", MemberSchema);

module.exports = Member;
