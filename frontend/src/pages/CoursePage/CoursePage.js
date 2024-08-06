import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Sidebar from '../../components/Sidebar/Sidebar.js';
import styles from './CoursePage.module.css';
import EditModal from '../../components/Modals/EditModal.js';
import AddModal from '../../components/Modals/AddModal.js';


function CoursePage({ courseList }){
  let courses;

  const [checkedRows, setCheckedRows] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [batchProgramOfferings, setBatchProgramOfferings] = useState([]);
  const location = useLocation();
  const {batch, programCode} = location.state || {};

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/api${location.pathname}${location.search}`;
    // const url = `${process.env.REACT_APP_API_URL}/api/${location.pathname}${location.search}`;

    const getBatchProgramOfferings = async () => {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok)
        return;

      setIsPending(false);
      setBatchProgramOfferings(data);
    };

    getBatchProgramOfferings();
  }, [location]);

  const handleCheckboxChange = (id) => {
    setCheckedRows((prevCheckedRows) =>({
      ...prevCheckedRows,
      [id]: !prevCheckedRows[id], 
    }));
  };

  const getCheckedCourses = () => batchProgramOfferings.filter((courseOffering) => checkedRows[courseOffering._id]);

  if(!isPending){
    courses = batchProgramOfferings.map((courseOffering) => (
      <tr key={courseOffering._id}
          className={checkedRows[courseOffering._id] ? styles.checkedRow : ''}
          onClick={() => handleCheckboxChange(courseOffering._id)} 
      >
        <td>
          <input 
            type="checkbox"
            checked={checkedRows[courseOffering._id] || false}
            onChange={(e) => {
              e.stopPropagation(); 
              handleCheckboxChange(courseOffering._id);
            }} 
          />
        </td>
        <td>{courseOffering.takers[0].count}</td>
        <td>{courseOffering.code}</td>
        <td>{courseOffering.title}</td>
        <td>{courseOffering.offered_to}</td>
        <td>{courseOffering.section}</td>
        <td>{courseOffering.faculty}</td>
        <td>{courseOffering.day1}</td>
        <td>{courseOffering.begin1}</td>
        <td>{courseOffering.end1}</td>
        <td>{courseOffering.room1}</td>
        <td>{courseOffering.day2}</td>
        <td>{courseOffering.begin2}</td>
        <td>{courseOffering.end2}</td>
        <td>{courseOffering.room2}</td>
        <td>{courseOffering.enrl_cap}</td>
        <td>{courseOffering.remarks}</td> 
      </tr>
    ));
  }

  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)

  const checkedCourses = getCheckedCourses();
  const checkedCourse = checkedCourses.length > 0;
  const checkedOneCourse = checkedCourses.length === 1;

  console.log(checkedCourses)

  const onDelete = async () => {  
    const checkedCourseOfferings = getCheckedCourses();
    
    // If no rows are selected
    if (!checkedCourseOfferings.length)
      return;

    const courseDetails = checkedCourseOfferings
      .map((course) => `${course.code} ${course.section}`)
      .join("\n");

    const message = `Delete the following classes:\n${courseDetails}`;

    var result = window.confirm(message);
    if (result) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/course-offerings`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkedCourseOfferings),
      });
      
      const json = await response.json();
  
      console.table(json);
      // navigate(0);
    }

  }

  return (
    <div className={styles.container}>
        <Sidebar/>
        <div className={styles.content}>
            <h1>ID{batch} / {programCode}</h1>
            <div className={styles.tableWrapper}>
                <div className={styles.controls}>
                    <div className={styles.searchBar}>
                        <input type="text"/>
                    </div>
                    <div className={styles.iconButtons}>

                        <div className={`${styles.iconButton} ${styles.editIcon} ${!checkedOneCourse ? styles.disabled : ''}`} 
                          onClick={() => {setOpenEditModal(true)}}
                        >
                          <img src="/img/icons/edit.png" alt="edit"></img>
                        </div>
                        {openEditModal && <EditModal setOpenEditModal={setOpenEditModal} openEditModal={openEditModal} courseInfo={getCheckedCourses()[0]}/>}

                        <div className={`${styles.iconButton} ${styles.deleteIcon} ${!checkedCourse ? styles.disabled : ''}`}
                          onClick={onDelete}
                        >
                          <img src="/img/icons/trash.png" alt="delete"></img>
                        </div>
                    </div>
                </div>
            
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Num of Takers</th>
                            <th>Course Code</th>
                            <th>Course Title</th>
                            <th>Offered To</th>
                            <th>Sect</th>
                            <th>Faculty</th>
                            <th>Day 1</th>
                            <th>Begin 1</th>
                            <th>End 1</th> 
                            <th>Room 1</th> 
                            <th>Day 2</th>
                            <th>Begin 2</th>
                            <th>End 2</th> 
                            <th>Room 2</th> 
                            <th>Enrll Cap</th> 
                            <th>Remarks</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {courses}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}



export default CoursePage