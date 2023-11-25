const express = require("express");
const authController = require("../controllers/clubAuth.controller");
const validateTokenMiddleware = require('../middlewares/jwtVerifier');
const router = express.Router();
const verifyID = require('../middlewares/verifyID');

// Route for user signup
router.post("/signup", authController.signup);

// Route for user signin
router.post("/signin", authController.signin);

router.get('/validate-token', validateTokenMiddleware, (req, res) => {
  // Access the decoded payload via req.decoded
  res.status(201).json({ message: 'This is a protected route', decoded: req.decoded ,valid:true});
});

router.get('/verify-id/:id', verifyID, (req, res) => {

  res.status(201).json({ message: 'Valid id and token matched.' ,valid:true});
});
module.exports = router;
