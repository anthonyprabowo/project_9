const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const asyncHandler = require('../middlewares/asyncHandler');
const { authenticateUser } = require('../middlewares/userAuth');

const User  = require('../models').User;

// get route
router.get('/', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  res.json({ 
    user: user.firstName + " " + user.lastName,
    username: user.emailAddress 
  });
}));

// user post route
router.post('/', asyncHandler(async  (req, res) => {
  const password = req.body.password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res.status(201).json(user); 
}))


module.exports = router;
