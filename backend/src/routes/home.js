const { Router } = require('express');

const router = Router();

// GET
router.get('/', (req, res) => {
  res.status(200).json({
    mssg: "GET request on home page",
  });
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
