const CourseOfferings = require('#models/CourseOfferings.js');
const findMergeableCourses = require("#services/find-merges.js");


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
    const possibleMerges = findMergeableCourses(courseOfferings);
    res.status(200).json(possibleMerges);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


// Create a course offering
async function addCourseOffer(req, res) {
  try {
    const {  
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

    const courseOffer = await CourseOfferings.create({
      takers: [],
      courseCode,
      courseTitle,
      offeredTo,
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
    });

    res.status(200).json(courseOffer);

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


// Merge a course offering
async function createMergedCourseOffering(req, res) {
  try {
    const { mergeToId, mergeFromId } = req.body;
    const courseOffering1 = await CourseOfferings.findById(mergeToId);
    const courseOffering2 = await CourseOfferings.findById(mergeFromId);

    // Check if both course offerings exist
    if (!courseOffering1 || !courseOffering2)
      return res.status(404).json({ error: 'One or both course offerings not found' });

    // Combine the takers arrays (avoiding duplicates)
    const combinedTakers = [
      ...courseOffering1.takers,
      ...courseOffering2.takers.filter(taker2 => !courseOffering1.takers.some(taker1 => 
          taker1.programCode === taker2.programCode && taker1.batch === taker2.batch
        )
      )
    ];

    // Update courseOffering1 with the combined takers
    courseOffering1.takers = combinedTakers;
    await courseOffering1.save();

    // Delete courseOffering2
    // await CourseOfferings.findByIdAndDelete(mergeFromId);
    res.status(200).json({ courseOffering1 });
  
  } catch (error) {
    res.status(400).json({ error: error.message });
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
  addCourseOffer,
  addTaker,
  createMergedCourseOffering,
  deleteTaker,
  updateCourseOffering,
};
