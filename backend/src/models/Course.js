const { Schema, model } = require('mongoose');

const courseSchema = new Schema({
  program: { String, required: true },
  batch: { Number, required: true },
  
  code: { String, required: true },
  title: { String, required: true },
  offered_to: { String, required: true },
  section: { String, required: true },
  faculty: { String, required: true },
  
  day1: { String, required: true },
  begin1: { Number, required: true },
  end1: { Number, required: true },
  room1: { String, required: true },

  day2: String,
  begin2: Number,
  end2: Number,
  room2: String,

  enrl_cap: Number,
  remarks: String,
});


module.exports = model('Users', courseSchema);
