const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
  takers: [{
    program: { type: String, required: true }, // BSCS-ST
    batch: { type: Number, required: true },   // 122
    count: { type: Number, required: true },  // student count
  }],
  
  code: { type: String, required: true },
  title: { type: String, required: true },
  offered_to: { type: String, required: true },
  section: { type: String, required: true },
  faculty: { type: String, required: true },
  
  day1: { type: String, required: true },
  begin1: { type: Number, required: true },
  end1: { type: Number, required: true },
  room1: { type: String, required: true },

  day2: String,
  begin2: Number,
  end2: Number,
  room2: String,

  enrl_cap: Number,
  remarks: String,
}, { timestamps: true });


module.exports = model('Courses', courseSchema);
