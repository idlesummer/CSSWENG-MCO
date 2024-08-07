function findMergeableCourses(courseOfferings) {
  const mergeableCourses = [];

  // Iterate through each course offering
  for (let i = 0; i < courseOfferings.length; i++) {
    const course1 = courseOfferings[i];

    // Check if course1 has at least one taker
    if (course1.takers.length === 0)
      continue; // Skip to the next course if no takers

    // Compare with other course offerings
    for (let j = i + 1; j < courseOfferings.length; j++) {
      const course2 = courseOfferings[j];

      if (course2.takers.length === 0)
        continue; // Skip to the next course if no takers

      // Check if course codes match and total takers is less than 45
      if (
        course1.courseCode === course2.courseCode && 
        course1.takers.reduce((sum, taker) => sum + taker.count, 0) + 
        course2.takers.reduce((sum, taker) => sum + taker.count, 0) <= 45
      ) {
        mergeableCourses.push([course1, course2]); // Add the pair to the result
      }
    }
  }

  return mergeableCourses;
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

module.exports = findMergeableCourses;
