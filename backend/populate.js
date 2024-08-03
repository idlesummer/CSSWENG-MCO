require('dotenv/config');
const mongoose = require('mongoose')
const Courses = require("#models/Courses.js");

// BSIET-AD 124
mongoose.connect(process.env.MONGO_URI).then(_ => {

  Courses.create({ 
    takers: [{
      program: "BSIET-AD",
      batch: 124,
      count: 12,
    }],
  
    code: "CCPROG3", 
    title: "Object-Oriented Programming", 
    offered_to: "X", 
    section: "X22",
    faculty: "CRUZ, MARIA", 
    
    day1: "T",
    begin1: "1000", 
    end1: "1200", 
    room1: "Room 204", 
    
    day2: "F",
    begin2: "1000",
    end2: "1200", 
    room2: "Room 204", 
    enrl_cap: "40",
    remarks: "F2F",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIET-AD",
      batch: 124,
      count: 14,
    }],
  
    code: "ST-MATH", 
    title: "Integral Calculus for Computer Science Students", 
    offered_to: "X", 
    section: "X23",
    faculty: "-", 
    
    day1: "T",
    begin1: "1300", 
    end1: "1500", 
    room1: "Room 205", 
    
    day2: "F",
    begin2: "1300",
    end2: "1500", 
    room2: "Room 205", 
    enrl_cap: "40",
    remarks: "F2F",
  });

  Courses.create({ 
    takers: [{
      program: "BSIET-AD",
      batch: 124,
      count: 12,
    }],
    
    code: "GERIZAL", 
    title: "Life and Works of Rizal", 
    offered_to: "X", 
    section: "X26",
    faculty: "SANTOS, MIGUEL", 
    
    day1: "M",
    begin1: "0900", 
    end1: "1100", 
    room1: "Room 105", 
    
    day2: "H",
    begin2: "0900",
    end2: "1100", 
    room2: "Room 105", 
    enrl_cap: "30",
    remarks: "Online",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIET-AD",
      batch: 124,
      count: 12,
    }],
    
    code: "GEARTAP", 
    title: "Art Appreciation", 
    offered_to: "X", 
    section: "X27",
    faculty: "REYES, JENNIFER", 
    
    day1: "T",
    begin1: "1530", 
    end1: "1700", 
    room1: "Room 206", 
    
    day2: "F",
    begin2: "1530",
    end2: "1700", 
    room2: "Room 206", 
    enrl_cap: "35",
    remarks: "F2F",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIET-AD",
      batch: 124,
      count: 12,
    }],
    
    code: "LCFAITH", 
    title: "Faith Worth Living", 
    offered_to: "X", 
    section: "X28",
    faculty: "GOMEZ, ANGELA", 
    
    day1: "M",
    begin1: "1100", 
    end1: "1300", 
    room1: "Room 303", 
    
    day2: "H",
    begin2: "1100",
    end2: "1300", 
    room2: "Room 303", 
    enrl_cap: "40",
    remarks: "Hybrid",
  });
})

// BSIET-GD 124
mongoose.connect(process.env.MONGO_URI).then(_ => {

  Courses.create({ 
    takers: [{
      program: "BSIET-GD",
      batch: 124,
      count: 15,
    }],
    
    code: "CCPROG3", 
    title: "Object-Oriented Programming", 
    offered_to: "X", 
    section: "X23",
    faculty: "CRUZ, JUAN", 
    
    day1: "M",
    begin1: "0900", 
    end1: "1030", 
    room1: "Room 201", 
    
    day2: "H",
    begin2: "0900",
    end2: "1030", 
    room2: "Room 201", 
    enrl_cap: "35",
    remarks: "Hybrid",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIET-GD",
      batch: 124,
      count: 15,
    }],
    
    code: "GEUSELF", 
    title: "Understanding the Self", 
    offered_to: "X", 
    section: "X24",
    faculty: "RAMOS, MARIA CLARA", 
    
    day1: "T",
    begin1: "1000", 
    end1: "1130", 
    room1: "Room 202", 
    
    day2: "F",
    begin2: "1000",
    end2: "1130", 
    room2: "Room 202", 
    enrl_cap: "30",
    remarks: "F2F",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIET-GD",
      batch: 124,
      count: 15,
    }],
    
    code: "GESPORT", 
    title: "Physical Fitness and Wellness in Individual Sports", 
    offered_to: "X", 
    section: "X25",
    faculty: "VILLANUEVA, ANTONIO", 
    
    day1: "M",
    begin1: "1300", 
    end1: "1430", 
    room1: "Gym", 
    
    day2: "H",
    begin2: "1300",
    end2: "1430", 
    room2: "Gym", 
    enrl_cap: "40",
    remarks: "Online",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIET-GD",
      batch: 124,
      count: 15,
    }],
    
    code: "GETEAMS", 
    title: "Physical Fitness and Wellness in Team Sports", 
    offered_to: "X", 
    section: "X26",
    faculty: "DELA CRUZ, MARIO", 
    
    day1: "T",
    begin1: "1530", 
    end1: "1700", 
    room1: "Gym", 
    
    day2: "F",
    begin2: "1530",
    end2: "1700", 
    room2: "Gym", 
    enrl_cap: "35",
    remarks: "Hybrid",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIET-GD",
      batch: 124,
      count: 15,
    }],
    
    code: "LCASEAN", 
    title: "The Filipino and ASEAN", 
    offered_to: "X", 
    section: "X27",
    faculty: "FERNANDEZ, LUIS", 
    
    day1: "M",
    begin1: "1700", 
    end1: "1830", 
    room1: "Room 401", 
    
    day2: "H",
    begin2: "1700",
    end2: "1830", 
    room2: "Room 401", 
    enrl_cap: "40",
    remarks: "F2F",
  });
  
})

// BSIS 124
mongoose.connect(process.env.MONGO_URI).then(_ => {

  Courses.create({ 
    takers: [{
      program: "BSIS",
      batch: 124,
      count: 25,
    }],
    
    code: "CCPROG3", 
    title: "Object Oriented Programming", 
    offered_to: "X", 
    section: "X24",
    faculty: "RAMOS, MARIA CLARA", 
    
    day1: "T",
    begin1: "1000", 
    end1: "1200", 
    room1: "Lab 4", 
    
    day2: "F",
    begin2: "1000",
    end2: "1200", 
    room2: "Lab 4", 
    enrl_cap: "30",
    remarks: "F2F",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIS",
      batch: 124,
      count: 25,
    }],
    
    code: "GERIZAL", 
    title: "Life and Works of Rizal", 
    offered_to: "X", 
    section: "X25",
    faculty: "VILLANUEVA, ANTONIO", 
    
    day1: "M",
    begin1: "1300", 
    end1: "1430", 
    room1: "Room 302", 
    
    day2: "H",
    begin2: "1300",
    end2: "1430", 
    room2: "Room 302", 
    enrl_cap: "40",
    remarks: "Online",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIS",
      batch: 124,
      count: 25,
    }],
    
    code: "ST-MATH", 
    title: "Linear Algebra for Computer Science Students", 
    offered_to: "X", 
    section: "X26",
    faculty: "CRUZ, JUAN", 
    
    day1: "T",
    begin1: "1530", 
    end1: "1700", 
    room1: "Room 303", 
    
    day2: "F",
    begin2: "1530",
    end2: "1700", 
    room2: "Room 303", 
    enrl_cap: "35",
    remarks: "Hybrid",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIS",
      batch: 124,
      count: 25,
    }],
    
    code: "LCASEAN", 
    title: "The Filipino and ASEAN", 
    offered_to: "X", 
    section: "X27",
    faculty: "FERNANDEZ, LUIS", 
    
    day1: "M",
    begin1: "1700", 
    end1: "1830", 
    room1: "Room 401", 
    
    day2: "H",
    begin2: "1700",
    end2: "1830", 
    room2: "Room 401", 
    enrl_cap: "40",
    remarks: "F2F",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIS",
      batch: 124,
      count: 25,
    }],
    
    code: "GETEAMS", 
    title: "Physical Fitness and Wellness in Team Sports", 
    offered_to: "X", 
    section: "X28",
    faculty: "TUMALE, MARIA CRISTINA", 
    
    day1: "T",
    begin1: "1800", 
    end1: "1930", 
    room1: "Gym", 
    
    day2: "F",
    begin2: "1800",
    end2: "1930", 
    room2: "Gym", 
    enrl_cap: "30",
    remarks: "F2F",
  });

})

// BSCS-ST 124
mongoose.connect(process.env.MONGO_URI).then(_ => {

  Courses.create({ 
    takers: [{
      program: "BSCS-ST",
      batch: 124,
      count: 30,
    }],
    
    code: "GERIZAL", 
    title: "Life and Works of Rizal", 
    offered_to: "X", 
    section: "X25",
    faculty: "VILLANUEVA, ANTONIO", 
    
    day1: "M",
    begin1: "1300", 
    end1: "1430", 
    room1: "Room 302", 
    
    day2: "H",
    begin2: "1300",
    end2: "1430", 
    room2: "Room 302", 
    enrl_cap: "35",
    remarks: "Online",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSCS-ST",
      batch: 124,
      count: 30,
    }],
    
    code: "CCPROG3", 
    title: "Object-Oriented Programming", 
    offered_to: "X", 
    section: "X26",
    faculty: "DELA CRUZ, MARIO", 
    
    day1: "T",
    begin1: "1000", 
    end1: "1130", 
    room1: "Lab 1", 
    
    day2: "F",
    begin2: "1000",
    end2: "1130", 
    room2: "Lab 1", 
    enrl_cap: "40",
    remarks: "Hybrid",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSCS-ST",
      batch: 124,
      count: 30,
    }],
    
    code: "LCFAITH", 
    title: "Faith Worth Living", 
    offered_to: "X", 
    section: "X27",
    faculty: "FERNANDEZ, LUIS", 
    
    day1: "M",
    begin1: "1500", 
    end1: "1630", 
    room1: "Room 401", 
    
    day2: "H",
    begin2: "1500",
    end2: "1630", 
    room2: "Room 401", 
    enrl_cap: "35",
    remarks: "F2F",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSCS-ST",
      batch: 124,
      count: 30,
    }],
    
    code: "ST-MATH", 
    title: "Linear Algebra for Computer Science Students", 
    offered_to: "X", 
    section: "X28",
    faculty: "CRUZ, JUAN", 
    
    day1: "T",
    begin1: "1700", 
    end1: "1830", 
    room1: "Room 402", 
    
    day2: "F",
    begin2: "1700",
    end2: "1830", 
    room2: "Room 402", 
    enrl_cap: "40",
    remarks: "Online",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSCS-ST",
      batch: 124,
      count: 30,
    }],
    
    code: "GESPORT", 
    title: "Physical Fitness and Wellness in Individual Sports", 
    offered_to: "X", 
    section: "X29",
    faculty: "TUMALE, MARIA CRISTINA", 
    
    day1: "M",
    begin1: "0730", 
    end1: "0900", 
    room1: "Gym", 
    
    day2: "H",
    begin2: "0730",
    end2: "0900", 
    room2: "Gym", 
    enrl_cap: "30",
    remarks: "Hybrid",
  });
  
})

// BSIET-AD 123
mongoose.connect(process.env.MONGO_URI).then(_ => {

  Courses.create({ 
    takers: [{
      program: "BSIET-AD",
      batch: 123,
      count: 5,
    }],
    
    code: "GERIZAL", 
    title: "Life and Works of Rizal", 
    offered_to: "X", 
    section: "X25",
    faculty: "VILLANUEVA, ANTONIO", 
    
    day1: "M",
    begin1: "1100", 
    end1: "1230", 
    room1: "Room 302", 
    
    day2: "H",
    begin2: "1100",
    end2: "1230", 
    room2: "Room 302", 
    enrl_cap: "35",
    remarks: "Online",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIET-AD",
      batch: 123,
      count: 5,
    }],
    
    code: "CCPROG2", 
    title: "Programming with Structured Data Types", 
    offered_to: "X", 
    section: "X26",
    faculty: "DELA CRUZ, MARIO", 
    
    day1: "T",
    begin1: "0900", 
    end1: "1030", 
    room1: "Lab 1", 
    
    day2: "F",
    begin2: "0900",
    end2: "1030", 
    room2: "Lab 1", 
    enrl_cap: "30",
    remarks: "F2F",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIET-AD",
      batch: 123,
      count: 5,
    }],
    
    code: "GEARTAP", 
    title: "Art Appreciation", 
    offered_to: "X", 
    section: "X27",
    faculty: "FERNANDEZ, LUIS", 
    
    day1: "M",
    begin1: "1330", 
    end1: "1500", 
    room1: "Room 303", 
    
    day2: "H",
    begin2: "1330",
    end2: "1500", 
    room2: "Room 303", 
    enrl_cap: "35",
    remarks: "Hybrid",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIET-AD",
      batch: 123,
      count: 5,
    }],
    
    code: "CSMATH2", 
    title: "Linear Algebra for Computer Science Students", 
    offered_to: "X", 
    section: "X28",
    faculty: "RAMOS, MARIA CLARA", 
    
    day1: "T",
    begin1: "1600", 
    end1: "1730", 
    room1: "Room 402", 
    
    day2: "F",
    begin2: "1600",
    end2: "1730", 
    room2: "Room 402", 
    enrl_cap: "40",
    remarks: "Online",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIET-AD",
      batch: 123,
      count: 5,
    }],
    
    code: "GESPORT", 
    title: "Physical Fitness and Wellness in Individual Sports", 
    offered_to: "X", 
    section: "X29",
    faculty: "TUMALE, MARIA CRISTINA", 
    
    day1: "W",
    begin1: "0730", 
    end1: "0900", 
    room1: "Gym", 
    
    day2: "F",
    begin2: "0730",
    end2: "0900", 
    room2: "Gym", 
    enrl_cap: "30",
    remarks: "F2F",
  });
  
})

// BSIET-GD 123
mongoose.connect(process.env.MONGO_URI).then(_ => {

  Courses.create({ 
    takers: [{
      program: "BSIET-GD",
      batch: 123,
      count: 10,
    }],
    
    code: "GERIZAL", 
    title: "Life and Works of Rizal", 
    offered_to: "X", 
    section: "X25",
    faculty: "VILLANUEVA, ANTONIO", 
    
    day1: "M",
    begin1: "0900", 
    end1: "1030", 
    room1: "Room 302", 
    
    day2: "H",
    begin2: "0900",
    end2: "1030", 
    room2: "Room 302", 
    enrl_cap: "35",
    remarks: "Online",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIET-GD",
      batch: 123,
      count: 10,
    }],
    
    code: "CCPROG2", 
    title: "Programming with Structured Data Types", 
    offered_to: "X", 
    section: "X26",
    faculty: "DELA CRUZ, MARIO", 
    
    day1: "W",
    begin1: "0900", 
    end1: "1030", 
    room1: "Lab 2", 
    
    day2: "F",
    begin2: "0900",
    end2: "1030", 
    room2: "Lab 2", 
    enrl_cap: "30",
    remarks: "F2F",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIET-GD",
      batch: 123,
      count: 10,
    }],
    
    code: "GEARTAP", 
    title: "Art Appreciation", 
    offered_to: "X", 
    section: "X27",
    faculty: "FERNANDEZ, LUIS", 
    
    day1: "M",
    begin1: "1400", 
    end1: "1530", 
    room1: "Room 303", 
    
    day2: "H",
    begin2: "1400",
    end2: "1530", 
    room2: "Room 303", 
    enrl_cap: "35",
    remarks: "Hybrid",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIET-GD",
      batch: 123,
      count: 10,
    }],
    
    code: "CSMATH2", 
    title: "Linear Algebra for Computer Science Students", 
    offered_to: "X", 
    section: "X28",
    faculty: "RAMOS, MARIA CLARA", 
    
    day1: "W",
    begin1: "1600", 
    end1: "1730", 
    room1: "Room 402", 
    
    day2: "F",
    begin2: "1600",
    end2: "1730", 
    room2: "Room 402", 
    enrl_cap: "40",
    remarks: "Online",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIET-GD",
      batch: 123,
      count: 10,
    }],
    
    code: "GESPORT", 
    title: "Physical Fitness and Wellness in Individual Sports", 
    offered_to: "X", 
    section: "X29",
    faculty: "TUMALE, MARIA CRISTINA", 
    
    day1: "T",
    begin1: "0730", 
    end1: "0900", 
    room1: "Gym", 
    
    day2: "H",
    begin2: "0730",
    end2: "0900", 
    room2: "Gym", 
    enrl_cap: "30",
    remarks: "F2F",
  });
  
})

// BSIS 123
mongoose.connect(process.env.MONGO_URI).then(_ => {

  Courses.create({ 
    takers: [{
      program: "BSIS",
      batch: 123,
      count: 25,
    }],
    
    code: "GERIZAL", 
    title: "Life and Works of Rizal", 
    offered_to: "X", 
    section: "X25",
    faculty: "VILLANUEVA, ANTONIO", 
    
    day1: "W",
    begin1: "1100", 
    end1: "1230", 
    room1: "Room 302", 
    
    day2: "F",
    begin2: "1100",
    end2: "1230", 
    room2: "Room 302", 
    enrl_cap: "35",
    remarks: "Online",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIS",
      batch: 123,
      count: 25,
    }],
    
    code: "CCPROG2", 
    title: "Programming with Structured Data Types", 
    offered_to: "X", 
    section: "X26",
    faculty: "DELA CRUZ, MARIO", 
    
    day1: "T",
    begin1: "1100", 
    end1: "1230", 
    room1: "Lab 3", 
    
    day2: "F",
    begin2: "1100",
    end2: "1230", 
    room2: "Lab 3", 
    enrl_cap: "30",
    remarks: "F2F",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIS",
      batch: 123,
      count: 25,
    }],
    
    code: "GEUSELF", 
    title: "Understanding the Self", 
    offered_to: "X", 
    section: "X27",
    faculty: "MENDOZA, ANGELA", 
    
    day1: "W",
    begin1: "1400", 
    end1: "1530", 
    room1: "Room 305", 
    
    day2: "F",
    begin2: "1400",
    end2: "1530", 
    room2: "Room 305", 
    enrl_cap: "35",
    remarks: "Hybrid",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIS",
      batch: 123,
      count: 25,
    }],
    
    code: "CSMATH2", 
    title: "Linear Algebra for Computer Science Students", 
    offered_to: "X", 
    section: "X28",
    faculty: "RAMOS, MARIA CLARA", 
    
    day1: "M",
    begin1: "1600", 
    end1: "1730", 
    room1: "Room 402", 
    
    day2: "H",
    begin2: "1600",
    end2: "1730", 
    room2: "Room 402", 
    enrl_cap: "40",
    remarks: "Online",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSIS",
      batch: 123,
      count: 25,
    }],
    
    code: "GESPORT", 
    title: "Physical Fitness and Wellness in Individual Sports", 
    offered_to: "X", 
    section: "X29",
    faculty: "TUMALE, MARIA CRISTINA", 
    
    day1: "T",
    begin1: "0900", 
    end1: "1030", 
    room1: "Gym", 
    
    day2: "H",
    begin2: "0900",
    end2: "1030", 
    room2: "Gym", 
    enrl_cap: "30",
    remarks: "F2F",
  });
  
})

// BSCS-ST 123
mongoose.connect(process.env.MONGO_URI).then(_ => {

  Courses.create({ 
    takers: [{
      program: "BSCS-ST",
      batch: 123,
      count: 30,
    }],
    
    code: "GERIZAL", 
    title: "Life and Works of Rizal", 
    offered_to: "X", 
    section: "X25",
    faculty: "VILLANUEVA, ANTONIO", 
    
    day1: "W",
    begin1: "0900", 
    end1: "1030", 
    room1: "Room 302", 
    
    day2: "F",
    begin2: "0900",
    end2: "1030", 
    room2: "Room 302", 
    enrl_cap: "35",
    remarks: "Online",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSCS-ST",
      batch: 123,
      count: 30,
    }],
    
    code: "CCPROG2", 
    title: "Programming with Structured Data Types", 
    offered_to: "X", 
    section: "X26",
    faculty: "DELA CRUZ, MARIO", 
    
    day1: "M",
    begin1: "0900", 
    end1: "1030", 
    room1: "Lab 3", 
    
    day2: "W",
    begin2: "0900",
    end2: "1030", 
    room2: "Lab 3", 
    enrl_cap: "30",
    remarks: "F2F",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSCS-ST",
      batch: 123,
      count: 30,
    }],
    
    code: "CSMATH2", 
    title: "Linear Algebra for Computer Science Students", 
    offered_to: "X", 
    section: "X27",
    faculty: "RAMOS, MARIA CLARA", 
    
    day1: "M",
    begin1: "1300", 
    end1: "1430", 
    room1: "Room 402", 
    
    day2: "W",
    begin2: "1300",
    end2: "1430", 
    room2: "Room 402", 
    enrl_cap: "40",
    remarks: "Hybrid",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSCS-ST",
      batch: 123,
      count: 30,
    }],
    
    code: "GEUSELF", 
    title: "Understanding the Self", 
    offered_to: "X", 
    section: "X28",
    faculty: "MENDOZA, ANGELA", 
    
    day1: "T",
    begin1: "1400", 
    end1: "1530", 
    room1: "Room 305", 
    
    day2: "H",
    begin2: "1400",
    end2: "1530", 
    room2: "Room 305", 
    enrl_cap: "35",
    remarks: "Online",
  });
  
  Courses.create({ 
    takers: [{
      program: "BSCS-ST",
      batch: 123,
      count: 30,
    }],
    
    code: "GESPORT", 
    title: "Physical Fitness and Wellness in Individual Sports", 
    offered_to: "X", 
    section: "X29",
    faculty: "TUMALE, MARIA CRISTINA", 
    
    day1: "M",
    begin1: "0730", 
    end1: "0900", 
    room1: "Gym", 
    
    day2: "H",
    begin2: "0730",
    end2: "0900", 
    room2: "Gym", 
    enrl_cap: "30",
    remarks: "F2F",
  });
  
})