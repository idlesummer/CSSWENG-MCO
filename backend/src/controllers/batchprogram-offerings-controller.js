const CourseOfferings = require('#models/CourseOfferings.js');



// Get a batch list (or get course page)
async function getBatchProgramOfferings(req, res) {
  try {
    const { batch, code } = req.query;
    const courseOfferings = await CourseOfferings.find({ takers: { $elemMatch: { batch, programCode: code }}});
    
    res.status(200).json(courseOfferings);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { getBatchProgramOfferings };
