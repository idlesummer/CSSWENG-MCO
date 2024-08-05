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

  const handleCheckboxChange = (index) => {
    setCheckedRows((prevCheckedRows) =>({
      ...prevCheckedRows,
      [index]: !prevCheckedRows[index], 
    }));
  };

  const getCheckedCourses = () => batchProgramOfferings.filter((_, index) => checkedRows[index]);

  if (!isPending){
    courses = batchProgramOfferings.map((course, index) => (
      <tr key={index}
        className={checkedRows[index] ? styles.checkedRow : ''}
        onClick={() => handleCheckboxChange(index)} 
      >
        <td>
          <input 
            type="checkbox"
            checked={checkedRows[index] || false}
            onChange={(e) => {
              e.stopPropagation(); 
              handleCheckboxChange(index);
            }} 
          />
        </td>
          {course.takers.map((taker, index) => (
            <td key={index}>{taker.count}</td>
          ))}
          <td>{course.code}</td>
          <td>{course.title}</td>
          <td>{course.offered_to}</td>
          <td>{course.section}</td>
          <td>{course.faculty}</td>
          <td>{course.day1}</td>
          <td>{course.begin1}</td>
          <td>{course.end1}</td>
          <td>{course.room1}</td>
          <td>{course.day2}</td>
          <td>{course.begin2}</td>
          <td>{course.end2}</td>
          <td>{course.room2}</td>
          <td>{course.enrl_cap}</td>
          <td>{course.remarks}</td>
        </tr>
      ));
    }

  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)

  const checkedCourses = getCheckedCourses();
  const checkedCourse = checkedCourses.length > 0;
  const checkedOneCourse = checkedCourses.length === 1;

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
                        <div className={`${styles.iconButton} ${styles.addIcon}`} 
                          onClick={() => {setOpenAddModal(true)}}
                        >
                          <img src="/img/icons/plus.png" alt="add"></img>
                        </div>
                        {openAddModal && <AddModal closeModal={setOpenAddModal}/>}
                        
                        <div className={`${styles.iconButton} ${styles.editIcon} ${!checkedOneCourse ? styles.disabled : ''}`} 
                          onClick={() => {setOpenEditModal(true)}}
                        >
                          <img src="/img/icons/edit.png" alt="edit"></img>
                        </div>
                        {openEditModal && <EditModal closeModal={setOpenEditModal}/>}

                        <div className={`${styles.iconButton} ${styles.deleteIcon} ${!checkedCourse ? styles.disabled : ''}`}
                          onClick={null}
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