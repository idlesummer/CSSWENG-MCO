require('dotenv/config');
const mongoose = require('mongoose')
const Courses = require("#models/Courses.js");

mongoose.connect(process.env.MONGO_URI).then(_ => {

  Courses.create({ 
    takers: [{
      program: "BSIET-AD",
      batch: 124,
      count: 12,
    }],
  
    code: "GEFTWEL", 
    title: "Physical Fitness and Wellness", 
    offered_to: "X", 
    section: "X22",
    faculty: "TUMALE, MARIA CRISTINA", 
    
    day1: "T",
    begin1: "1300", 
    end1: "1500", 
    room1: "Gym", 
    
    day2: "F",
    begin2: "1300",
    end2: "1500", 
    room2: "Gym", 
    enrl_cap: "40",
    remarks: "F2F",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIET-AD",
      batch: 124,
      count: 14,
    }],
  
    code: "GEFTWEL", 
    title: "Physical Fitness and Wellness", 
    offered_to: "X", 
    section: "X23",
    faculty: "-", 
    
    day1: "T",
    begin1: "1300", 
    end1: "1500", 
    room1: "Gym", 
    
    day2: "F",
    begin2: "1300",
    end2: "1500", 
    room2: "Gym", 
    enrl_cap: "40",
    remarks: "F2F",
  });
})

