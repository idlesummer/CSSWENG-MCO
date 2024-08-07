import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';


import Sidebar from '../../components/Sidebar/Sidebar.js'
import styles from '../CoursePage/CoursePage.module.css';
import EditModal from '../../components/Modals/EditModal.js';
import MergeModal from '../../components/Modals/MergeModal.js';
import SplitModal from '../../components/Modals/SplitModal.js';
import AddModal from '../../components/Modals/AddModal.js';
import DeleteModal from '../../components/Modals/DeleteModal.js';



function CourseCourseOfferings(){
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [snackbarQueue, setSnackbarQueue] = useState([]);

  const [input, setInput] = useState("");

  const [courseOfferings, setCourses] = useState([]);
  const [checkedRows, setCheckedRows] = useState({});
  const [loading, setLoading] = useState(true);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openMergeModal, setOpenMergeModal] = useState(false);
  const [openSplitModal, setOpenSplitModal] = useState (false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [possibleMerges, setPossibleMerges] = useState([]);
  const [mergeAlert, setMergeAlert] = useState([])
  const [highlightedMerges, setHighlightedMerges] = useState([]);

  const [mergeNotifs, setMergeNotifs] = useState(() => () => {});
  const snackbarKeys = useRef([]); 

  // const [checkedCourseOfferings, setCheckedCourseOfferings] = useState([]);

  const navigate = useNavigate();


  
  useEffect(() => {
    const fetchCourseOfferings = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/course-offerings`);
      // const res = await fetch(`http://localhost:4000/api/course-offerings`);
      
      const courseOfferings = await res.json();     
      setLoading(false);
      setCourses(courseOfferings);
    }

    fetchCourseOfferings();
  }, [openDeleteModal]);

  // possible merges
  useEffect(() => {
    const fetchPossibleMerges = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/course-offerings/find-merges`);
      
      const possibleMerges = await res.json();    
      setPossibleMerges(possibleMerges)
    }
    fetchPossibleMerges();
  }, []);

  console.log('possibleMerges', possibleMerges)

  // // merge notif queue
  // useEffect(() => {
  //   setMergeNotifs(() => () => {
  //     possibleMerges.forEach((merge) => 
  //       enqueueSnackbar( 
  //         <div>
  //           {merge.map((course) => ( 
  //             <span key={course._id}> {course.courseCode} <br/> </span>
  //           ))}
  //           {"can be merged."}
  //         </div>, 
  //         {
  //         variant: 'info',
  //         anchorOrigin: {
  //           vertical: 'bottom',
  //           horizontal: 'right',
  //         },
  //         action: key => (
  //           <div style={{ display: 'flex', alignItems: 'center' }}>
  //             <button
  //               className={styles.snackBarButton}
  //               onClick={() => {
  //                 setHighlightedMerges(merge.map(course => course._id));
  //                 closeSnackbar(key);
  //               }}
  //             >
  //               Highlight Merges
  //             </button>
  //             <span 
  //               className={styles.snackBarDismiss}
  //               onClick={() => closeSnackbar(key)}>
  //               Dismiss
  //             </span>
  //           </div>
  //         ),
  //         autoHideDuration: null,
  //       })
  
  //     )
      
  //   });

  // }, [possibleMerges] );

  // // merge notif call
  // useEffect(() => {
  //   if (typeof mergeNotifs === 'function') {
  //     mergeNotifs(); 
  //   }
  // }, [mergeNotifs]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
          {'can be merged.'}
        </div>,
        {
          variant: 'info',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
          action: (key) => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button
                className={styles.snackBarButton}
                onClick={() => {
                  handleUncheckAll()
                  setHighlightedMerges(
                    currentSnackbar.map((course) => course._id)
                  );
                  currentSnackbar.map((course) => (handleCheckboxChange(course._id)))
                  
                  
                  closeSnackbar(key);
                  removeSnackbarFromQueue();
                }}
              >
                Highlight Merges
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

  // Function to remove the first snackbar from the queue
  const removeSnackbarFromQueue = () => {
    setSnackbarQueue((prevQueue) => prevQueue.slice(1));
  };

  // Effect to update the merge notifications
  useEffect(() => {
    setMergeNotifs(() => () => {
      // Enqueue new snackbars
      const newQueue = possibleMerges.map((merge) => merge);
      setSnackbarQueue(newQueue);
    });
  }, [possibleMerges]);

  // Effect to trigger snackbar queue processing
  useEffect(() => {
    if (typeof mergeNotifs === 'function') {
      mergeNotifs();
    }
  }, [mergeNotifs]);

  // Process the snackbar queue whenever it changes
  useEffect(() => {
    if (snackbarQueue.length > 0) {
      processQueue();
    }
  }, [snackbarQueue, processQueue]);

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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const filteredCourses = useMemo(() => {
    return courseOfferings.filter(courseOffering => {
      return courseOffering.courseCode.toLowerCase().includes(input.toLowerCase());
    });
  }, [courseOfferings, input]);

  const handleCheckboxChange = (id) => {
    setCheckedRows((prevCheckedRows) =>({
      ...prevCheckedRows,
      [id]: !prevCheckedRows[id], 
    }));
  };

  const handleUncheckAll = () => {
    setCheckedRows((prevCheckedRows) => {
      const updatedRows = {};
      for (const id in prevCheckedRows) {
        updatedRows[id] = false;
      }
      return updatedRows;
    });
  };

  // function returns JSON of selected rows
  const getCheckedCourseOfferings = () => courseOfferings.filter((courseOffering) => checkedRows[courseOffering._id]);
  
  // table data

  var courseOfferingRows; 

  if(!loading){
    const sortedCourseOfferings = [...filteredCourses].sort((a, b) => {
      const isAHighlighted = highlightedMerges.includes(a._id);
      const isBHighlighted = highlightedMerges.includes(b._id);

      if (isAHighlighted && !isBHighlighted) return -1; 
      if (!isAHighlighted && isBHighlighted) return 1; 
      return 0; 
    });
    
    courseOfferingRows = sortedCourseOfferings.map((courseOffering) => (
      <tr key={courseOffering._id}
          className={`${checkedRows[courseOffering._id] ? styles.checkedRow : ''}`}
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
        <td>
        {courseOffering.takers.map((taker, index) => (
          <React.Fragment key={index}>
            {`${taker.programCode}-${taker.batch} (${taker.count}) `}<br/>
            {/* <td>{`${taker.programCode}-${taker.batch}`}</td>
            <td>{taker.count}</td> */}
          </React.Fragment>
          
        ))}
        </td>
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
 

  // const onDelete = async () => {  
  //   const checkedCourseOfferings = getCheckedCourseOfferings();
    
  //   // If no rows are selected
  //   if (!checkedCourseOfferings.length)
  //     return;

  //   const courseDetails = checkedCourseOfferings
  //     .map((course) => `${course.code} ${course.section}`)
  //     .join("\n");

  //   const message = `Delete the following classes:\n${courseDetails}`;

  //   var result = window.confirm(message);
  //   if (result) {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/course-offerings`, {
  //       method: "DELETE",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(checkedCourseOfferings),
  //     });
      
  //     const json = await response.json();
  
  //     console.table(json);
  //     navigate(0);
  //   }

  // }
  
  const checkedCourseOfferings = getCheckedCourseOfferings();
  const checkedCourse = checkedCourseOfferings.length > 0;
  const checkedOneCourse = checkedCourseOfferings.length === 1;
  // const checkedTwoCourses = checkedCourseOfferings.length === 2;

  const canRemoveTakers = () => {
    if (checkedCourseOfferings.length !== 1) return false;

    if (checkedCourseOfferings[0].takers.length > 0) return true;

    return false;
  };

  const canMergeCourses = () => {
    if (checkedCourseOfferings.length !== 2) return false;

    if (checkedCourseOfferings[0].takers.length < 1) return false

    if (checkedCourseOfferings[1].takers.length < 1) return false

    return checkedCourseOfferings[0].courseCode === checkedCourseOfferings[1].courseCode
  }

  console.log(checkedCourseOfferings);

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <h1>SIS Course Offerings</h1>
        <div className={styles.tableWrapper}>
          <div className={styles.controls}>
            <div className={styles.searchBar}>
                <input 
                    type="text" 
                    value = {input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </div>
            <div className={styles.iconButtons}>
              <div className={`${styles.iconButton} ${styles.addIcon} ${!checkedOneCourse ? styles.disabled : ''}`}
                   onClick={() => {setOpenAddModal(true)}}
              >
                <img src="/img/icons/plus.png" alt="add"></img>
              </div>
              {openAddModal && <AddModal 
                                  setOpenAddModal={setOpenAddModal} 
                                  openAddModal={openAddModal} 
                                  fromCourseOfferings={true}
                                  courseInfo={getCheckedCourseOfferings()[0]}/>}
              
              <div className={`${styles.iconButton} ${styles.editIcon} ${!checkedOneCourse ? styles.disabled : ''} `} 
                   onClick={() => {setOpenEditModal(true)}}
              >
                    <img src="/img/icons/edit.png" alt="edit"></img>
              </div>
              {openEditModal && <EditModal 
                                  setOpenEditModal={setOpenEditModal} 
                                  openEditModal={openEditModal} 
                                  courseInfo={getCheckedCourseOfferings()[0]}/>}
              
              <div className={`${styles.iconButton} ${styles.mergeIcon} ${!canMergeCourses() ? styles.disabled : ''}` } 
                   onClick={() => {setOpenMergeModal(true)}}
              >
                    <img src="/img/icons/merge.png" alt="merge"></img>
              </div>
              {openMergeModal && <MergeModal 
                                  setOpenMergeModal={setOpenMergeModal} 
                                  openMergeModal={openMergeModal} 
                                  courseList={checkedCourseOfferings}/>}
              
              <div className={`${styles.iconButton} ${styles.splitIcon}`} onClick={() => {setOpenSplitModal(true)}}><img src="/img/icons/split.png" alt="split"></img></div>
              {openSplitModal && (<SplitModal closeModal={setOpenSplitModal} />)}
              
              <div 
                className={`${styles.iconButton} ${styles.deleteIcon} ${!canRemoveTakers() ? styles.disabled : ''}`}
                onClick={() => {setOpenDeleteModal(true)}}
              >
                <img src="/img/icons/trash.png" alt="delete"></img>
              </div>
              {openDeleteModal && <DeleteModal
                                  setOpenDeleteModal={setOpenDeleteModal} 
                                  openDeleteModal={openDeleteModal} 
                                  courseInfo={getCheckedCourseOfferings()[0]}/>}
            </div>
          </div>

          { 
            loading ? (<div className={styles.loading }>Loading...</div>) : (
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Program</th>
                    {/* <th>Num of Takers</th> */}
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
