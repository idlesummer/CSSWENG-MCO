const CourseOfferings = require('#models/CourseOfferings.js');
const getBatchesAndPrograms = require('#src/services/get-batches-and-programs.js');


// Get all batch lists
async function getBatchLists(req, res) {  
  try {
    const courseOfferings = await CourseOfferings.find({ });
    const batchesAndPrograms = getBatchesAndPrograms(courseOfferings);

    const batchLists = {
      batches: Object.keys(batchesAndPrograms).sort((a, b) => Number(b) - Number(a)),
      batchesAndPrograms,
    }

    res.status(200).json(batchLists);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { getBatchLists };
