const Courses = require('#src/models/Courses.js');
const { Router } = require('express');

const router = Router();

// GET
router.get('/', async (req, res) => {
  const offerings = Courses.find({ }).sort({ createdAt: -1 });
  res.status(200).json(offerings);
});

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
