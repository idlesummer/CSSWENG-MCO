const { Router } = require('express');

const Courses = require('#models/CourseOfferings.js');
const {
  getCourseOfferings,
  createCourseOffering,
  deleteCourseOfferings,
  updateCourseOffering,
} = require('#src/controllers/CourseOfferingsController.js');


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
