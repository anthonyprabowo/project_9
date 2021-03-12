const express = require('express');
const router = express.Router();
const Course = require('../models').Course;
const asyncHandler = require('../middlewares/asyncHandler');

// Get all courses
router.get('/', asyncHandler( async (req, res) => {
  const course = await Course.findAll();
  res.json(course);
}))

// Get specific course
router.get('/:id',asyncHandler( async (req, res) => {
  
}))

// Post a course
router.post('/', asyncHandler( async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json(course);
}))

// Edit a course
router.put('/:id', asyncHandler( async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  try {
    if(course) {
      const updatedCourse = await Course.update(req.body);
      res.status(204).json(updatedCourse);
    } else {
      res.status()
    }
  } catch(err) {
    // check if the error is a validation error
    if(err.name === 'SequelizeValidationError') {
      const updatedCourse = await Course.build(req.body); // build the models but never save it to the database
      const error = err.errors.map(error => error.message);
      res.status(400).json({ error });
    } else {
      throw err;
    }
  }
}))

// delete a course
router.delete('/:id', (req, res) => {
  res.status(205);
})

module.exports = router;