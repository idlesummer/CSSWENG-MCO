const { Router } = require('express');

const {
  getCourseOfferings,
  addTaker,
  deleteCourseOfferings,
  updateCourseOffering,
} = require('#src/controllers/course-offerings-controller.js');


const router = Router();

// GET
router.get('/', getCourseOfferings);

// POST
router.post('/', addTaker);

// DELETE
router.delete('/', deleteCourseOfferings);

// UPDATE
router.patch('/', updateCourseOffering);

module.exports = router;
