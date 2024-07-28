import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar.js';
import styles from './CoursePage.module.css';
import EditModal from '../Modals/EditModal.js';
import AddModal from '../Modals/AddModal.js';

import PropTypes from 'prop-types'

function CoursePage({ courseList }){

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
    const [openAddModal, setOpenAddModal] = useState(false)

        
    return(
        <div className={styles.container}>
            <Sidebar/>
            <div className={styles.content}>
                <h1>ID124 / BSIET-AD</h1>
                <div className={styles.tableWrapper}>
                    <div className={styles.controls}>
                        <div className={styles.searchBar}>
                            <input type="text"/>
                        </div>
                        <div className={styles.iconButtons}>
                            <div className={`${styles.iconButton} ${styles.addIcon}`} onClick={() => {setOpenAddModal(true)}}><img src="/img/icons/plus.png" alt="add"></img></div>
                            {openAddModal && <AddModal closeModal={setOpenAddModal}/>}
                            <div className={`${styles.iconButton} ${styles.editIcon}`} onClick={() => {setOpenEditModal(true)}}><img src="/img/icons/edit.png" alt="edit"></img></div>
                            {openEditModal && <EditModal closeModal={setOpenEditModal}/>}
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

CoursePage.propTypes = {
    courseList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        code: PropTypes.string,
        title: PropTypes.string,
        offered_to: PropTypes.string,
        section: PropTypes.string,
        faculty: PropTypes.string,
        day1: PropTypes.string,
        begin1: PropTypes.string,
        end1: PropTypes.string,
        room1: PropTypes.string,
        day2: PropTypes.string,
        begin2: PropTypes.string,
        end2: PropTypes.string,
        room2: PropTypes.string,
        enrl_cap: PropTypes.string,
        remarks: PropTypes.string
      })
    )
  };
  
// not working
CoursePage.defaultProps = {
    courseList: [
      {
        id: 0,
        code: "N/A",
        title: "No Data",
        offered_to: "N/A",
        section: "N/A",
        faculty: "N/A",
        day1: "N/A",
        begin1: "N/A",
        end1: "N/A",
        room1: "N/A",
        day2: "N/A",
        begin2: "N/A",
        end2: "N/A",
        room2: "N/A",
        enrl_cap: "0",
        remarks: "No Remarks"
      }
    ]
  };

export default CoursePage