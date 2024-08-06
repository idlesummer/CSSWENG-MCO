const CourseOfferings = require('#models/CourseOfferings.js');
const findMerges = require("#services/find-merges.js");


// Get all course offerings
async function getCourseOfferings(req, res) {
  try {
    const courseOfferings = await CourseOfferings.find({ }).sort({ createdAt: -1 });
    res.status(200).json(courseOfferings);

  } catch (error) {
    res.status(400).json({ error: err.message });
  }
}

// Get all possible merges
async function getPossibleMerges(req, res) {
  try {
    const courseOfferings = await CourseOfferings.find({  });
    const possibleMerges = findMerges(courseOfferings);
    res.status(200).json(possibleMerges);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Create a course offering taker
async function addTaker(req, res) {
  try {
    const { courseId: _id , batch, programCode, programName, takers: count } = req.body;

    // Find the course offering by ID
    const courseOffer = await CourseOfferings.findById(_id);

    // Check if the course offering exists
    if (!courseOffer)
      return res.status(404).json({ error: 'Course offering not found' });

    // Create a new taker object
    const taker = { programCode, programName, batch, count };

    // Add the new taker to the takers array using $push
    await CourseOfferings.findByIdAndUpdate(_id, { $push: { takers: taker } });

    // Fetch the updated course offering (optional, if you need to send it back in the response)
    const updatedCourseOffer = await CourseOfferings.findById(_id);

    res.status(200).json(updatedCourseOffer);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


// Delete many course offerings
async function deleteTaker(req, res) {
  const { takerId, courseId } = req.body;

  try {
    const updatedCourseOffer = await CourseOfferings.findByIdAndUpdate(
      courseId,
      { $pull : { takers: { _id: takerId }}},
      { new: true },
    );  

    if (!updatedCourseOffer)
      return res.status(400).json({ error: 'Course offering not found' });

    res.status(200).json(updatedCourseOffer);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


// Update/edit a course offering
async function updateCourseOffering(req, res) {
  try {
    const courseOffer = {
      _id,

      courseCode = null,
      courseTitle = null,
      offeredTo = 'X',
      section = null,
      faculty = null,

      day1 = null,
      begin1 = null,
      end1 = null,
      room1 = null,
      day2 = null,
      begin2 = null,
      end2 = null,
      room2 = null,

      enrlCap = null,
      remarks = null,
    } = req.body;

    const updatedCourseOffer = await CourseOfferings.findByIdAndUpdate(_id, courseOffer, { new: true });
    
    if (!updatedCourseOffer) // BTW IT RETURNS NULL IF ID IS NOT FOUND
      res.status(400).json({ error: 'Id is not found' });
    
    res.status(200).json(updatedCourseOffer);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


module.exports = {
  getCourseOfferings,
  getPossibleMerges,
  addTaker,
  deleteTaker,
  updateCourseOffering,
};
