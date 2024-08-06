const { Router } = require('express');

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
// router.post('/merge', createCourseOffering);
// router.post('/split', createCourseOffering);

// DELETE
router.delete('/', deleteCourseOfferings);

// UPDATE
router.patch('/', updateCourseOffering);

module.exports = router;
