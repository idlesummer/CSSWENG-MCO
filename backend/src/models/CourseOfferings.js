const { Schema, model } = require('mongoose');

const courseOfferingSchema = new Schema({
  takers: [{
    programCode: String, // BSCS-ST
    programName: String, // Bachelor of Science in Computer Science major in Software Technology
    batch: Number,       // 122
    count: Number,       // student count
  }],
  
  courseCode: { type: String, required: true },
  courseTitle: String,
  offeredTo: String,
  section: String,
  faculty: String,
  
  day1: String,
  begin1: String,
  end1: String,
  room1: String,

  day2: String,
  begin2: String,
  end2: String,
  room2: String,

  enrlCap: Number,
  remarks: String,
}, { timestamps: true });


module.exports = model('CourseOfferings', courseOfferingSchema);
