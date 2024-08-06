function hasTimeConflict(course1, course2) {
  // Check for conflicts on day1
  if (course1.day1 === course2.day1) {
    const c1Begin1 = course1.begin1 ? Number(course1.begin1) : null;
    const c1End1 = course1.end1 ? Number(course1.end1) : null;
    const c2Begin1 = course2.begin1 ? Number(course2.begin1) : null;
    const c2End1 = course2.end1 ? Number(course2.end1) : null;

    // Check if all times are valid (not null)
    if (c1Begin1 !== null && c1End1 !== null && c2Begin1 !== null && c2End1 !== null) {
      if (c1Begin1 <= c2End1 && c1End1 >= c2Begin1) {
        return true; // Conflict on day1
      }
    } 
    // If any time is null, assume no conflict on that day
  }

  // Check for conflicts on day2 (if applicable)
  if (course1.day2 && course2.day2 && course1.day2 === course2.day2) {
    const c1Begin2 = course1.begin2 ? Number(course1.begin2) : null;
    const c1End2 = course1.end2 ? Number(course1.end2) : null;
    const c2Begin2 = course2.begin2 ? Number(course2.begin2) : null;
    const c2End2 = course2.end2 ? Number(course2.end2) : null;

    // Check if all times are valid (not null)
    if (c1Begin2 !== null && c1End2 !== null && c2Begin2 !== null && c2End2 !== null) {
      if (c1Begin2 <= c2End2 && c1End2 >= c2Begin2) {
        return true; // Conflict on day2
      }
    } 
    // If any time is null, assume no conflict on that day
  }

  return false; // No conflict
}


function findConflicts(courseOfferings) {
  const conflicts = [];

  for (let i = 0; i < courseOfferings.length; i++) {
    for (let j = i + 1; j < courseOfferings.length; j++) {
      console.log(courseOfferings[i].begin1, courseOfferings[i].end1)
      console.log(courseOfferings[j].begin2, courseOfferings[j].end2)
      console.log(hasTimeConflict(courseOfferings[i], courseOfferings[j]))

      if (hasTimeConflict(courseOfferings[i], courseOfferings[j])) {
        conflicts.push([courseOfferings[i], courseOfferings[j]]);
      }
    }
  }

  return conflicts;
}

module.exports = findConflicts;
