const Courses = require('#src/models/Courses.js');
const { Router } = require('express');

const router = Router();

// GET
router.get('/', async (req, res) => {
  const offerings = await Courses.find({ }).sort({ createdAt: -1 });
  res.status(200).json(offerings);
});

// POST
router.post('/', async (req, res) => {

  const {
    code,
    title,
    section,
    faculty,
    day1,
    begin1,
    end1,
    room1,
    day2,
    begin2,
    end2,
    room2,
    enrlCap,
    remarks,
  } = req.body;

  try {
    const offering = await Courses.create({
      takers: [{
        program: "BSCS-ST",
        batch: 122,
        count: 20,
      }],
      code,
      title,
      section,
      offered_to: "X",
      faculty,
      day1,
      begin1: Number(begin1),
      end1: Number(end1),
      room1,
      day2,
      begin2: Number(begin2),
      end2: Number(end2),
      room2,
      enrlCap: Number(enrlCap),
      remarks,
    });

    res.status(200).json(offering);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }



  // res.status(200).json({
  //   mssg: "POST request on home page",
  // });
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
