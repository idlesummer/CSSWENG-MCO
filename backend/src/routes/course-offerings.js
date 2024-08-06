const { Router } = require('express');

const {
  getCourseOfferings,
  getPossibleMerges,
  addTaker,
  createMergedCourseOffering,
  deleteTaker,
  updateCourseOffering,
} = require('#controllers/course-offerings-controller.js');


const router = Router();

// GET
router.get('/', getCourseOfferings);
router.get('/merges', getPossibleMerges);

// POST
router.post('/', addTaker);

// DELETE
router.delete('/', deleteTaker);

// UPDATE
router.patch('/', updateCourseOffering);
router.patch('/merge', createMergedCourseOffering);

module.exports = router;
