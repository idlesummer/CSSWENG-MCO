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
async function createCourseOffering(req, res) {
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
    const courseOffering = await CourseOfferings.create({
      takers: [{ program: "BSCS-ST", batch: 122, count: 20 }],
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

    res.status(200).json(courseOffering);
  
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


// Delete many course offerings
async function deleteCourseOfferings(req, res) {
  const ids = req.body.map(courseOffering => courseOffering._id);

  try {
    const result = await CourseOfferings.deleteMany({ _id: { $in: ids }});  
    res.status(200).json(result);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}


// Update/edit a course offering
async function updateCourseOffering(req, res) {
  res.status(200).json({
    mssg: "UPDATE request on course offering",
  });
}


module.exports = {
  getCourseOfferings,
  createCourseOffering,
  deleteCourseOfferings,
  updateCourseOffering,
};
