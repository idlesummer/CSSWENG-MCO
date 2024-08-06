const CourseOfferings = require('#models/CourseOfferings.js');


// Get all course offerings
async function getCourseOfferings(req, res) {
  try {
    const courseOfferings = await CourseOfferings.find({ }).sort({ createdAt: -1 });
    res.status(200).json(courseOfferings);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


// Create a course offering
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
async function deleteCourseOfferings(req, res) {
  const ids = req.body.map(courseOffer => courseOffer._id);

  try {
    const result = await CourseOfferings.deleteMany({ _id: { $in: ids }});  
    res.status(200).json(result);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


// Update/edit a course offering
async function updateCourseOffering(req, res) {
  try {
    const courseOffer = {
      _id,
      takers,

      code,
      title,
      offered_to,
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

    const updatedCourseOffer = await CourseOfferings.findByIdAndUpdate(_id, courseOffer, { new: true });
    res.status(200).json(updatedCourseOffer);

    // RETURNS NULL IF ID IS NOT FOUND

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


module.exports = {
  getCourseOfferings,
  createCourseOffering,
  deleteCourseOfferings,
  updateCourseOffering,
};
