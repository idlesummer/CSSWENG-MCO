const headerConversion = {
  'Course Code': 'courseCode', 
  'Course Title': 'courseTitle', 
  'Offered To': 'offeredTo', 
  'Sect': 'section', 
  'Faculty': 'faculty',

  'Day1': 'day1', 
  'Begin1': 'begin1', 
  'End1': 'end1', 
  'Room1': 'room1', 
  'Day2': 'day2', 
  'Begin2': 'begin2', 
  'End2': 'end2', 
  'Room2': 'room2'
  , 
  'Enrl Cap': 'enrlCap', 
  'Remarks': 'remarks',
};

function convertHeaders(courseOfferings) {
  return courseOfferings.map(courseOffer => {
    const convertedCourseOffer = { };
    
    for (const originalHeader in headerConversion) {
      const convertedHeader = headerConversion[originalHeader];
      convertedCourseOffer[convertedHeader] = courseOffer[originalHeader] ?? null;
    }
    return convertedCourseOffer;
  });

}

module.exports = { 
  convertHeaders,
  headerConversion,
  requiredHeaders: Object.keys(headerConversion),
};
