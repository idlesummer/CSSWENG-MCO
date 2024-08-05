import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Sidebar from "../Sidebar/Sidebar.js";
import styles from '../CoursePage/CoursePage.module.css';
import EditModal from '../Modals/EditModal.js';
import MergeModal from '../Modals/MergeModal.js';
import SplitModal from '../Modals/SplitModal.js';
import AddModal from '../Modals/AddModal.js';


function CourseCourseOfferings(){
  const [courseOfferings, setCourses] = useState([]);
  const [checkedRows, setCheckedRows] = useState({});
  const [loading, setLoading] = useState(true);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openMergeModal, setOpenMergeModal] = useState(false);
  const [openSplitModal, setOpenSplitModal] = useState (false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const navigate = useNavigate();
  

  const handleCheckboxChange = (index) => {
    setCheckedRows((prevCheckedRows) =>({
      ...prevCheckedRows,
      [index]: !prevCheckedRows[index], 
    }));
  };

  // function returns JSON of selected rows
  const getCheckedCourseOfferings = () => courseOfferings.filter((courseOffering, index) => checkedRows[index]);

  const courseOfferingRows = courseOfferings.map((courseOffering, index) => (
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

  const onDelete = async () => {  
    const checkedCourseOfferings = getCheckedCourseOfferings();
    
    // If no rows are selected
    if (!checkedCourseOfferings.length)
      return;

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/course-offerings`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(checkedCourseOfferings),
    });
    
    const json = await response.json();

    console.table(json);
    navigate(0);
  }
  

  useEffect(() => {
    const fetchCourseOfferings = async () => {
      // const res = await fetch(`${process.env.REACT_APP_API_URL}/api/course-offerings`);
      const res = await fetch(`http://localhost:4000/api/course-offerings`);
      
      const courseOfferings = await res.json();     
      setLoading(false);
      setCourses(courseOfferings);
    }

    fetchCourseOfferings();
  }, []);

  const checkedCourseOfferings = getCheckedCourseOfferings();
  const checkedCourse = checkedCourseOfferings.length > 0;
  const checkedOneCourse = checkedCourseOfferings.length === 1;
  const checkedTwoCourses = checkedCourseOfferings.length === 2;

  console.log(checkedCourseOfferings);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h1>SIS Course CourseOfferings for T3</h1>
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
              
              <div className={`${styles.iconButton} ${styles.editIcon} ${!checkedOneCourse ? styles.disabled : ''} `} 
                   onClick={() => {setOpenEditModal(true)}}
              >
                    <img src="/img/icons/edit.png" alt="edit"></img>
              </div>
              {openEditModal && <EditModal closeModal={setOpenEditModal} courseInfo={getCheckedCourseOfferings()[0]}/>}
              
              <div className={`${styles.iconButton} ${styles.mergeIcon} ${!checkedTwoCourses ? styles.disabled : ''}` } 
                   onClick={() => {setOpenMergeModal(true)}}
              >
                    <img src="/img/icons/merge.png" alt="merge"></img>
              </div>
              {openMergeModal && <MergeModal closeModal={setOpenEditModal} courses={checkedCourseOfferings}/>}
              
              <div className={`${styles.iconButton} ${styles.splitIcon}`} onClick={() => {setOpenSplitModal(true)}}><img src="/img/icons/split.png" alt="split"></img></div>
              {openSplitModal && (<SplitModal closeModal={setOpenSplitModal} />)}
              
              <div 
                className={`${styles.iconButton} ${styles.deleteIcon} ${!checkedCourse ? styles.disabled : ''}`}
                onClick={onDelete}
              >
                <img src="/img/icons/trash.png" alt="delete"></img>
              </div>
            </div>
          </div>

          { 
            loading ? (<div className={styles.loading }>Loading...</div>) : (
              <table>
                <thead>
                  <tr>
                    <th></th>
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
                  { courseOfferingRows }
                </tbody>
              </table>
            )
          }

        </div>
      </div>
    </div>
  );
}

export default CourseCourseOfferings;
