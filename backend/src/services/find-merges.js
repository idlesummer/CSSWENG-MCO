// Conditions for merging
// same course
// less than 30 total takers
// no conflicts per program

// id1 and id2
// course offer details

// 
// {
//   ids: ["mergetoID", "mergeFromID"],
//   courseOfferDetails: {
//     ...
//   }
// }

require('dotenv/config');
const mongoose = require('mongoose');
const CourseOfferings = require('#models/CourseOfferings.js');


function getTotalTakers(courseOffer) {
  return courseOffer.takers.reduce((total, taker) => total + taker.count, 0);
}


function isMergeable(courseOffer1, courseOffer2) {

  // Check if course codes are different
  console.log('code')
  if (courseOffer1.code !== courseOffer2.code)
    return false;

  console.log('begin1')
  // Check if begin time 1 are different
  if (courseOffer1.begin1 !== courseOffer2.begin1)
    return false;

  console.log('end1')
  // Check if end time 1 is are different
  if (courseOffer1.end1 !== courseOffer2.end1)
    return false;

  console.log('begin2')
  // Check if begin time 2 is are different
  if (courseOffer1.begin2 && courseOffer2.begin2 && courseOffer1.begin2 !== courseOffer2.begin2)
    return false;

  console.log('end2')
  // Check if end time 2 is are different
  if (courseOffer1.end2 && courseOffer2.end2 && courseOffer1.end2 !== courseOffer2.end2)
    return false;

  console.log('takers')
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
  }

  return merges;
}

(async function () {
  await mongoose.connect(process.env.MONGO_URI);
  const courseOfferings = await CourseOfferings.find({ }).lean();
  const result = findMerges(courseOfferings);  
  console.log(result);
})()

module.exports = findMerges;
