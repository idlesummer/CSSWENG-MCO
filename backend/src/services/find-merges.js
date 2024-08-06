function getTotalTakers(courseOffer) {
  return courseOffer.takers.reduce((total, taker) => total + taker.count, 0);
}


function isMergeable(courseOffer1, courseOffer2) {

  // Check if course codes are different
  if (courseOffer1.courseCode !== courseOffer2.courseCode)
    return false;

  // Check if total number of takers are greater than the limit
  if (getTotalTakers(courseOffer1) + getTotalTakers(courseOffer2) > 45)
    return false;
  
  return true;
}


function findMerges(courseOfferings) {
  const merges = {};

  for (const courseOffer1 of courseOfferings) {
    if (!(courseOffer1._id in merges))
      merges[courseOffer1._id] = [courseOffer1];

    for (const courseOffer2 of courseOfferings) {
      if (courseOffer1._id !== courseOffer2._id && isMergeable(courseOffer1, courseOffer2))
        merges[courseOffer1._id].push(courseOffer2);
    }

    if (merges[courseOffer1._id].length === 1)
      merges[courseOffer1._id] = [];
  }

  return merges;
}

// (async function () {
//   require('dotenv/config');
//   const mongoose = require('mongoose');
//   const CourseOfferings = require('#models/CourseOfferings.js');


//   await mongoose.connect(process.env.MONGO_URI);
//   const courseOfferings = await CourseOfferings.find({ }).lean();
//   const result = findMerges(courseOfferings);  
//   console.log(result);
// })()

module.exports = findMerges;
