const CourseOfferings = require('#models/CourseOfferings.js');
const findConflicts = require('#services/find-conflicts.js');


// Get a batch list (or get course page)
async function getBatchProgramOfferings(req, res) {
  try {
    const { batch, code } = req.query;
    const courseOfferings = await CourseOfferings.find({ takers: { $elemMatch: { batch, programCode: code }}});

    res.status(200).json(courseOfferings);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


// Get list of course offerings that have conflicting schedules
async function getScheduleConflicts(req, res) {
  console.log('aklshdfklahjsd')
  try {
    const { ids } = req.body;
    const courseOfferings = await CourseOfferings.find({ _id: { $in: ids } });
    const conflicts = findConflicts(courseOfferings);
    res.status(200).json(conflicts);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


// Delete a list of takers from a multiple batch-program offerings
async function deleteBatchProgramOfferingTakers(req, res) {
  try {
    const { batch, courseIds, programCode } = req.body;
    console.log("req.body",req.body)
    const filter = {
      _id: { $in: courseIds },
      takers: {
        $elemMatch: { batch, programCode },
      },
    };

    console.log(filter)

    const result = await CourseOfferings.updateMany(
      filter,
      { $pull: { takers: { batch, programCode }}},
    );

    if (result.modifiedCount === 0)
      return res.status(400).json({ error: 'No matching takers found or no modifications made' });

    res.status(200).json(result);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { 
  getBatchProgramOfferings, 
  getScheduleConflicts,
  deleteBatchProgramOfferingTakers 
};
