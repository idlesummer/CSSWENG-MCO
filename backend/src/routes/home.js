const { Router } = require('express');
const Courses = require('#models/CourseOfferings.js');
const { getBatchLists } = require('#controllers/HomeController.js');

const router = Router();

// GET
router.get('/', getBatchLists);

// POST
router.post('/', (req, res) => {
  res.status(200).json({
    mssg: "POST request on home page",
  });
});

// DELETE
router.delete('/', (req, res) => {
  res.status(200).json({
    mssg: "DELETE request on home page",
  });
});

// UPDATE
router.patch('/', (req, res) => {
  res.status(200).json({
    mssg: "UPDATE request on home page",
  });
});

module.exports = router;
