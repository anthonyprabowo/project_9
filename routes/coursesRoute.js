const express = require('express');
const router = express.Router();
const User = require('../models').User;
const Course = require('../models').Course;
const asyncHandler = require('../middlewares/asyncHandler');
const { authenticateUser } = require('../middlewares/userAuth');


// Get all courses
router.get('/', asyncHandler( async (req, res) => {
  const course = await Course.findAll({
    include: {
      model: User,
      as: 'userID',
    }
  });
  res.json({course});
}))

// Get specific course
router.get('/:id',asyncHandler( async (req, res) => {
  const course = await Course.findAll({
    include: {
      model: User,
      as: 'userID'
    },
    where: {
      id: req.params.id
    }
  });
  if(course) {
    res.json({ course });
  } else {
    res.status(400).json( { message: `Course with id ${req.params.id} didn't exist`});
  }
}))

// Post a course
router.post('/', authenticateUser, asyncHandler( async (req, res) => {
  const user = req.currentUser;
  req.body.userId = user.id;
  const course = await Course.create(req.body);
  res.location(`api/courses/${course.id}`).status(201);
  
  
}))

// Edit a course
router.put('/:id', authenticateUser, asyncHandler( async (req, res) => {
  const user = req.currentUser
  const course = await Course.findByPk(req.params.id);
  if(course) {
    if(course.userId === user.id){
      const updatedCourse = await Course.update(req.body, {
        where: {
          id: course.id
        }
      });
      res.status(204)
    } else {
      res.status(403).json({message: "Update failed. You're not the owner of the post"})
    }
  }
}));

// delete a course
router.delete('/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id);
  if(course) {
    await course.destroy();
    res.status(204);
  } else {
    res.status(400).json({ message: `Course with id ${req.params.id} didn't exist`});
  }
  
}));

module.exports = router;