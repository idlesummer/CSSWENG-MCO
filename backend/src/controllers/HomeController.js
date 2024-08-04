const CourseOfferings = require('#models/CourseOfferings.js');
const getBatchesAndPrograms = require('#utils/getBatchesAndPrograms.js');


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


// Get a batch list (or get course page)
async function getCoursePage(req, res) {
  try {
    console.log(req.originalUrl)
    const { batch, code } = req.query;
    const courseOfferings = await CourseOfferings.find({ takers: { $elemMatch: { batch, programCode: code }}});
    
    console.log(courseOfferings)
    
    res.status(200).json(courseOfferings);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


module.exports = { getBatchLists, getCoursePage };
