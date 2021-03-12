const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/asyncHandler');

const User  = require('../models').User;

// get route
router.get('/', asyncHandler(async (req, res) => {
  const user = await User.findAll();
  res.json({ user });
}))

router.post('/', asyncHandler(async  (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user); 
}))


module.exports = router;
