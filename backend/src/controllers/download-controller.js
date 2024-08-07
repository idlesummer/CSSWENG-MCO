const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const CourseOfferings = require('#models/CourseOfferings.js');


async function download(req, res) {
  try {
    const courseOfferings = await CourseOfferings.find({ }); 

    // Group course offerings
    function groupCourseOfferings(groups, course) {
      const courseCode = course.courseCode.toUpperCase();

      if (['GEDANCE', 'GEFTWEL', 'GESPORT', 'GETEAMS'].includes(courseCode))
        groups['PE'].push(course);

      else if (courseCode.startsWith('NSTP') || courseCode.startsWith('SAS'))
        groups['NSTP & SAS'].push(course);
      
      else if (courseCode.startsWith('LASARE'))
        groups['LASARE'].push(course);
      
      else if (courseCode.startsWith('GE') || courseCode.startsWith('LC') || courseCode === 'IMAWRIT')
        groups['LC & GE'].push(course);
      
      else
        groups['CCS'].push(course);
      
      return groups;
    }

    const groupedCourses = courseOfferings.reduce(groupCourseOfferings, {
      '': [],
      'PE': [],
      'NSTP & SAS': [],
      'LASARE': [],
      'LC & GE': [],
      'CCS': []
    });

    // Convert grouped data to sheet format with headers
    const worksheet_data = [];

    for (const group in groupedCourses) {
      worksheet_data.push([group]); // Add group name as the first cell in a new row
      worksheet_data.push(...groupedCourses[group].map(course => [
        '',
        course.takers.map(taker => `${taker.programCode}-${taker.batch} (${taker.count})`).join(', '), // Combine takers
        course.courseCode,
        course.courseTitle,
        course.offeredTo,
        course.section,
        course.faculty,
        course.day1,
        course.begin1,
        course.end1,
        course.room1,
        course.day2,
        course.begin2,
        course.end2,
        course.room2,
        course.enrlCap,
        course.remarks
      ]));
    }

    const worksheet = xlsx.utils.aoa_to_sheet(worksheet_data);

    // Add header row (adjust as needed)
    const headers = [[
      '', 
      'TAKERS [w/ merged/combined sections/takers]', 
      'Course Code',
      'Course Title', 
      'Offered To', 
      'Sect', 
      'Faculty', 
      'Day 1', 
      'Begin 1', 
      'End 1', 
      'Room 1', 
      'Day 2', 
      'Begin 2', 
      'End 2', 
      'Room 2', 
      'Enrl Cap', 
      'Remarks'
    ]];
    
    xlsx.utils.sheet_add_aoa(worksheet, headers, { origin: 'A1' });

    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'CourseOfferings');

    // Specify the file path for saving on the server
    const filePath = path.join(__dirname, '..', 'uploads', 'course_offerings.xlsx');
    console.log(filePath)

    // Write the workbook to a buffer in memory
    const buf = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    // Write the buffer to the file on the server
    fs.writeFileSync(filePath, buf);

    // Set headers for the client download
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=course_offerings.xlsx');  

    // Send the buffer directly to the client for download
    res.send(buf);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = download;
