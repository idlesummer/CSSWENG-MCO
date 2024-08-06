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


// Delete a list of takers from a multiple batch-program offerings
async function deleteBatchProgramOfferingTakers(req, res) {
  try {
    const { batch, courseIds, programCode } = req.body;
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

module.exports = { getBatchProgramOfferings, deleteBatchProgramOfferingTakers };
