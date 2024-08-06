const xlsx = require('xlsx');
const CourseOfferings = require('#models/CourseOfferings.js');
const { convertHeaders, requiredHeaders } = require('#services/convert-headers.js');

async function createCourseOfferings(req, res) {
  try {

    // Check if a file was uploaded
    if (!req.file)
      return res.status(400).json({ error: 'No file uploaded' });

    // Parse xlsx file
    const workbook = xlsx.read(req.file.buffer);
    const worksheet = workbook.Sheets?.raw;

    // Check if worksheet named raw exists 
    if (!worksheet)
      return res.status(400).json({ error: 'No sheet named raw' });

    // Convert worksheet to json
    const courseOfferings = xlsx.utils.sheet_to_json(worksheet);
    
    // Check if required headers are present in each course offering
    if (courseOfferings.every(courseOffer => requiredHeaders.every(header => header in courseOffer)))
      return res.status(400).json({ error: 'Requried headers are missing' });

    // Convert each course offering headers to camelcase
    const convertedCourseOfferings = convertHeaders(courseOfferings);

    // Delete the current course offerings
    await CourseOfferings.deleteMany({ });

    // Replace the course offerings
    const newCourseOfferings = await CourseOfferings.insertMany(convertedCourseOfferings);

    res.status(200).json(newCourseOfferings);

  } catch (error) {
    res.status(400).json({error: error.message });
  }
}

module.exports = { createCourseOfferings };
