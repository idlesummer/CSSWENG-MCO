import { useEffect, useState, useCallback, useRef } from 'react';
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
  const [snackbarQueue, setSnackbarQueue] = useState([]);

  const [openEditModal, setOpenEditModal] = useState(false)
  const [openAddModal, setOpenAddModal] = useState(false)

  const [checkedRows, setCheckedRows] = useState({});
  const [isPending, setIsPending] = useState(true);
  const [batchProgramOfferings, setBatchProgramOfferings] = useState([]);
  const location = useLocation();
  
  const {batch, programCode} = location.state || {};

  const [conflicts, setConflicts] = useState([])
  const [conflictWarning, setConflictWarning] = useState([])
  const [highlightedConflicts, setHighlightedConflicts] = useState([]);

  const [conflictNotifs, setConflictNotifs] = useState(() => () => {});
  const snackbarKeys = useRef([]); 

  // let conflictNotifs = () => null

  // course list
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

  // schedule conflict array
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

  const checkedCourses = getCheckedCourses();
  const checkedCourse = checkedCourses.length > 0;
  const checkedOneCourse = checkedCourses.length === 1;
  console.log(checkedCourses)

  // function for conflict pop ups on load
  const processQueue = useCallback(() => {
    if (snackbarQueue.length > 0) {
      const currentSnackbar = snackbarQueue[0];

      const key = enqueueSnackbar(
        <div>
          {currentSnackbar.map((course) => (
            <span key={course._id}>
              {course.courseCode} {course.section}
              <br />
            </span>
          ))}
          {'have conflict.'}
        </div>,
        {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          action: (key) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                className={styles.snackBarButton}
                onClick={() => {
                  setHighlightedConflicts(
                    currentSnackbar.map((course) => course._id)
                  );
                  closeSnackbar(key);
                  removeSnackbarFromQueue(); 
                }}
              >
                Highlight Conflicts
              </button>
              <span
                className={styles.snackBarDismiss}
                onClick={() => {
                  closeSnackbar(key);
                  removeSnackbarFromQueue(); 
                }}
              >
                Dismiss
              </span>
            </div>
          ),
          autoHideDuration: null,
          persist: true, 
        }
      );
      snackbarKeys.current.push(key);
    }
  }, [enqueueSnackbar, snackbarQueue, closeSnackbar]);

  // remove the first snackbar from the queue
  const removeSnackbarFromQueue = () => {
    setSnackbarQueue((prevQueue) => prevQueue.slice(1));
  };

  // update the merge notifications
  useEffect(() => {
    setConflictNotifs(() => () => {
      // Enqueue new snackbars
      const newQueue = conflicts.map((merge) => merge);
      setSnackbarQueue(newQueue);
    });
  }, [conflicts]);

  // trigger snackbar queue processing
  useEffect(() => {
    if (typeof conflictNotifs === 'function') {
      conflictNotifs();
    }
  }, [conflictNotifs]);

  // Process the snackbar queue on change
  useEffect(() => {
    if (snackbarQueue.length > 0) {
      processQueue();
    }
  }, [snackbarQueue, processQueue]);

  // Removes snackbar queue on location change
  useEffect(() => {
    const handleUnload = () => {
      snackbarKeys.current.forEach((key) => {
        closeSnackbar(key);
      });
      snackbarKeys.current = [];
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      handleUnload();
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [closeSnackbar]);


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
  
  console.log("conflicts", conflicts)

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

                        <div className={`${styles.iconButton} ${styles.editIcon}`}
                             onClick={() => conflictNotifs()}
                        >
                          <img src="/img/icons/warning.png" alt="warning"></img>
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