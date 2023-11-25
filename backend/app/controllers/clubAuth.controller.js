const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Club = require("../models/club.model");
const secret = require("../config/auth.config");

// Function to sign a JSON Web Token
function signToken(club) {
  const payload = {
    id: club._id,
    email: club.email,
    isAdmin: club.isAdmin,
    name: club.clubName
  };

  const options = {
    expiresIn: "24h" // Token expires in 24 hours
  };

  return jwt.sign(payload, secret.secret, options);
}

// Controller methods
const authController = {
  signup: async (req, res) => {
    try {
      const { clubName, clubDescription, email, password, tel, etat, isAdmin } = req.body;

      // Check if the email is already registered
      const existingClub = await Club.findOne({ email });
      if (existingClub) {
        return res.status(400).json({ message: "Email is already registered" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new club
      const newClub = new Club({
        clubName,
        clubDescription,
        email,
        password: hashedPassword,
        tel,
        etat,
        isAdmin
      });

      // Save the club to the database
      await newClub.save();

      // Sign a JWT token for the club
      const token = signToken(newClub);

      // Respond with the token
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  signin: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find the club by email
      const club = await Club.findOne({ email });

      // Check if the club exists
      if (!club) {
        return res.status(401).json({ message: "Account doesn't exist!" });
      }

      // Compare the entered password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, club.password);

      // Check if the password is correct
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password!" });
      }

      if (!club.etat) {
        return res.status(403).json({ message: "Account is disabled, Contact the Administrator!" })
      }

      // Sign a JWT token for the club
      const token = signToken(club);
      const id = club._id;
      // Respond with the token
      res.status(200).json({ token, id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = authController;
