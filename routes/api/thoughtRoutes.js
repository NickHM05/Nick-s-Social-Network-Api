// change more references and functions to users, thoughts. 
const router = require('express').Router();
const {
  getCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../../controllers/thoughtController.js');

// /api/courses
router.route('/').get(getCourses).post(createCourse);

// /api/courses/:courseId
router
  .route('/:thoughtId')
  .get(getSingleCourse)
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
