import React, { useState, useEffect } from 'react';
import Sidebar from "../Sidebar/Sidebar.js";
import styles from '../CoursePage/CoursePage.module.css';
import EditModal from '../Modals/EditModal.js';
import MergeModal from '../Modals/MergeModal.js';
import SplitModal from '../Modals/SplitModal.js';
import AddModal from '../Modals/AddModal.js';


function CourseOfferings({ courseList , takersList}){

    useEffect(() => {
      const fetchOfferings = async () => {
        const res = await fetch("http://localhost:4000/api/offerings");
        const data = await res.json();

        console.log(data);
      }

      fetchOfferings();
    }, []);

    const courses = courseList.map((course, index) => (
        <tr key={index}>
          <td><input type="checkbox" /></td>
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

    const [openEditModal, setOpenEditModal] = useState(false)
    const [openMergeModal, setOpenMergeModal] = useState(false)
    const [openSplitModal, setOpenSplitModal] = useState (false)
    const [openAddModal, setOpenAddModal] = useState(false)

    console.log('takersList:', takersList);
        
    return(
        <div className={styles.container}>
            <Sidebar/>
            <div className={styles.content}>
                <h1>SIS Course Offerings for T3</h1>
                <div className={styles.tableWrapper}>
                    <div className={styles.controls}>
                        <div className={styles.searchBar}>
                            <input type="text"/>
                        </div>
                        <div className={styles.iconButtons}>
                            <div className={`${styles.iconButton} ${styles.addIcon}`}onClick={() => {setOpenAddModal(true)}}><img src="/img/icons/plus.png" alt="add"></img></div>
                            {openAddModal && <AddModal closeModal={setOpenAddModal}/>}
                            <div className={`${styles.iconButton} ${styles.editIcon}`} onClick={() => {setOpenEditModal(true)}}><img src="/img/icons/edit.png" alt="edit"></img></div>
                            {openEditModal && <EditModal closeModal={setOpenEditModal}/>}
                            <div className={`${styles.iconButton} ${styles.mergeIcon}`} onClick={() => {setOpenMergeModal(true)}}><img src="/img/icons/merge.png" alt="merge"></img></div>
                            {openMergeModal && <MergeModal closeModal={setOpenEditModal}/>}
                            <div className={`${styles.iconButton} ${styles.splitIcon}`} onClick={() => {setOpenSplitModal(true)}}><img src="/img/icons/split.png" alt="split"></img></div>
                            {openSplitModal && (<SplitModal closeModal={setOpenSplitModal} listOfTakers={takersList} courseList={courseList}/>)}
                            <div className={`${styles.iconButton} ${styles.deleteIcon}`}><img src="/img/icons/trash.png" alt="delete"></img></div>
                        </div>
                    </div>
                
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
                            {courses}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );

}

export default CourseOfferings