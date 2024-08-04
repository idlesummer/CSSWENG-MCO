const { Router } = require('express');

const Courses = require('#src/models/CourseOfferings.js');
const {
  getCourseOfferings,
  createCourseOffering,
  deleteCourseOfferings,
  updateCourseOffering,
} = require("#controllers/CourseOfferingsController.js");


const router = Router();

// GET
router.get('/', getCourseOfferings);

// POST
router.post('/', createCourseOffering);

// DELETE
router.delete('/', deleteCourseOfferings);

// UPDATE
router.patch('/', updateCourseOffering);

module.exports = router;
