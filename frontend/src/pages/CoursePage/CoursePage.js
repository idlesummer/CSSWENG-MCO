import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Sidebar from '../../components/Sidebar/Sidebar.js';
import styles from './CoursePage.module.css';
import EditModal from '../../components/Modals/EditModal.js';
import AddModal from '../../components/Modals/AddModal.js';

import { useSnackbar } from 'notistack';



function CoursePage({ courseList }){
  let courses;
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  const [checkedRows, setCheckedRows] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [batchProgramOfferings, setBatchProgramOfferings] = useState([]);
  const location = useLocation();
  const {batch, programCode} = location.state || {};
  const [conflicts, setConflicts] = useState([])

  const [highlightedConflicts, setHighlightedConflicts] = useState([]);


  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/api${location.pathname}${location.search}`;
    // const url = `${process.env.REACT_APP_API_URL}/api/${location.pathname}${location.search}`;

    const getBatchProgramOfferings = async () => {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok)
        return;

      console.log(data);
      setIsPending(false);
      setBatchProgramOfferings(data);
    };

    getBatchProgramOfferings();
  }, [location]);

  useEffect(() => {
    if(!isPending){
      const getScheduleConflicts = async () => {
        const ids = batchProgramOfferings.map(course => course._id);
        console.log("ids", ids);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/coursepage/find-conflicts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ids}),
        });
        
        const data = await response.json();

        if (!response.ok)
          return;

        setConflicts(data);

      }

      getScheduleConflicts()

    }
  }, [batchProgramOfferings, isPending]);

  const handleCheckboxChange = (id) => {
    setCheckedRows((prevCheckedRows) =>({
      ...prevCheckedRows,
      [id]: !prevCheckedRows[id], 
    }));
  };

  const getCheckedCourses = () => batchProgramOfferings.filter((courseOffering) => checkedRows[courseOffering._id]);

  // const conflictList = conflicts.reduce((acc, pair) => acc.concat(pair), []);
  // const conflictIds = conflictList.map(course => course._id);
  // table info
  if(!isPending){
    console.log(conflicts);

    courses = batchProgramOfferings.map((courseOffering) => (
      <tr key={courseOffering._id}
          className={`${checkedRows[courseOffering._id] ? styles.checkedRow: ''} 
                      ${highlightedConflicts.includes(courseOffering._id) ? styles.conflictRow : ''}`}
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
            style={{
              visibility: 'hidden', 
              margin: '0px'
            }} 
          />
        </td>
        <td>{courseOffering.takers[0].count}</td>
        <td>{courseOffering.courseCode}</td>
        <td>{courseOffering.courseTitle}</td>
        <td>{courseOffering.offeredTo}</td>
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
        <td>{courseOffering.enrlCap}</td>
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

  useEffect(() => {
    const conflictNotifs = () => {
      conflicts.forEach((conflict) => 
        enqueueSnackbar( 
          <div>
            {conflict.map((course) => ( 
              <span key={course.course_id}> {course.courseCode} <br/> </span>
            ))}
            {"are conflicting."}
          </div>, 
          {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          action: key => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                style={{ marginRight: 8 }}
                
                onClick={() => {
                  setHighlightedConflicts(conflict.map(course => course._id));
                  closeSnackbar(key);
                }}
              >
                Highlight Conflicts
              </button>
              <span onClick={() => closeSnackbar(key)} style={{ cursor: 'pointer' }}>
                Dismiss
              </span>
            </div>
          ),
          autoHideDuration: null, // Custom auto-hide duration
        })

      )
      
    };

    conflictNotifs()

  }, [conflicts]); 

  // setHighlightedConflicts(conflicts.map(conflict => conflict.map(course => course.course_id)));
  // console.log('highlighted',highlightedConflicts)

  // useEffect (() => {
  //   console.log('highlighted',highlightedConflicts)
  // }, [highlightedConflicts]);


  const onDelete = async () => {
    const checkedCourseOfferings = getCheckedCourses();

    const courseIds = checkedCourseOfferings.map(course => course._id);

    const remove = {
      courseIds,
      batch,
      programCode
    }

    console.log(remove)

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/coursepage`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(remove),
      });
      
    const json = await response.json();

    console.log(json);
    navigate(0);
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

                        <div className={`${styles.iconButton} ${styles.editIcon} ${!checkedOneCourse ? styles.disabled : ''}`} 
                          onClick={() => {setOpenEditModal(true)}}
                        >
                          <span>Show Conflicts</span>
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