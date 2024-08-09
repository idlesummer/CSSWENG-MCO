const { Router } = require('express');

const {
  getCourseOfferings,
  getPossibleMerges,
  addCourseOffer,
  addTaker,
  createMergedCourseOffering,
  deleteTaker,
  updateCourseOffering,
} = require('#controllers/course-offerings-controller.js');


const router = Router();

// GET
router.get('/', getCourseOfferings);
router.get('/find-merges', getPossibleMerges);

// POST
router.post('/add-course-offer', addCourseOffer);
router.post('/add-taker', addTaker);

// DELETE
router.delete('/', deleteTaker);

// UPDATE
router.patch('/', updateCourseOffering);
router.patch('/merge', createMergedCourseOffering);

module.exports = router;
