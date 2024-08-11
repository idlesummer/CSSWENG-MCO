import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";

import styles from './Modal.module.css';


function AddCourseModal({ setOpenAddCourseModal, openAddCourseModal }) {

  const [courseCode, setCourseCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [section, setSection] = useState("");

  const [faculty, setFaculty] = useState("");

  const [day1, setDay1] = useState("");
  const [begin1, setBegin1] = useState("");
  const [end1, setEnd1] = useState("");
  const [room1, setRoom1] = useState("");

  const [day2, setDay2] = useState("");
  const [begin2, setBegin2] = useState("");
  const [end2, setEnd2] = useState("");
  const [room2, setRoom2] = useState("");

  const [enrlCap, setEnrlCap] = useState("");
  const [remarks, setRemarks] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [end1Options, setEnd1Options] = useState([]);
  const [end2Options, setEnd2Options] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();

    const taker = {
      courseCode,
      courseTitle,
      section,
      faculty,
      day1,
      begin1,
      end1,
      room1,
      day2,
      begin2,
      end2,
      room2,
      enrlCap,
      remarks,
    };

    console.log(taker);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/course-offerings/add-course-offer`, {
      method: "POST",
      body: JSON.stringify(taker),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok)
      return setError(json.error);

    console.table(json);

    //Close the modal and navigate to /offerings
    navigate(0)
  };

  const timeMapping = useMemo(
    () => ({
      "730": ["900", "1045"],
      "915": ["1045", "1230"],
      "1100": ["1230", "1415"],
      "1245": ["1415", "1600"],
      "1430": ["1600", "1745"],
      "1615": ["1745", "1930"],
      "1800": ["1930"],
    }),
    []
  );

  useEffect(() => {
    setEnd1Options(timeMapping[begin1] || []);
    return () => {}
  }, [begin1, timeMapping]);

  useEffect(() => {
    setEnd2Options(timeMapping[begin2] || []);
    return () => {}
  }, [begin2, timeMapping]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.headers}>
          <h2>Add a new Course </h2>
        </div>

        <form onSubmit={onSubmit}>

          <div className={styles.formRow1}>
            <div className={styles.formGroup2}>
                <label htmlFor="name" className={styles.required} >Course Code</label>
                <input 
                  type="text" 
                  id="name" 
                  className={styles.inputText}
                  onChange={e => setCourseCode(e.target.value)}
                  value={courseCode}
                  required
                  
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.required}>Course Title</label>
                <input 
                  type="text" 
                  id="title" 
                  className={styles.inputText2}
                  onChange={e => setCourseTitle(e.target.value)}
                  value={courseTitle}
                  required
                  
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="section" className={styles.required}>Section</label>
                <input 
                  type="text" 
                  id="section" 
                  className={styles.inputText3}
                  onChange={e => setSection(e.target.value)}
                  value={section}
                  required
                  
                />
            </div>
          </div>

          <div className={styles.formRow4}>
            <div className={styles.formGroup}>
              <label htmlFor="faculty" className={styles.required} >Faculty</label>
              <input 
                type="text" 
                id="faculty" 
                className={styles.inputText2}
                onChange={e => setFaculty(e.target.value)}
                value={faculty}
                required
                
              />
            </div>

          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="day1" className={styles.required}>Day 1</label>
              <select 
                id="day1" 
                name="day1"
                onChange={e => setDay1(e.target.value)}
                value={day1}
                required
              >
                <option key="none" value="" disabled></option>
                <option key="M" value="M">M</option>
                <option key="T" value="T">T</option>
                <option key="W" value="W">W</option>
                <option key="H" value="H">H</option>
                <option key="F" value="F">F</option>
                <option key="Sa" value="Sa">Sa</option>
              </select>
            </div>

            <div className={styles.formGroup2} id="beginBox1">
              <label htmlFor="begin1" className={styles.required}>Begin 1</label>
              <select 
                id="begin1" 
                name="begin1"
                onChange={e => setBegin1(e.target.value)}
                value={begin1}
                required
              >
                <option key="none" value="" disabled></option>
                <option key="0730" value="730">0730</option>
                <option key="0915" value="915">0915</option>
                <option key="1100" value="1100">1100</option>
                <option key="1245" value="1245">1245</option>
                <option key="1430" value="1430">1430</option>
                <option key="1615" value="1615">1615</option>
                <option key="1800" value="1800">1800</option>
              </select>
            </div>

            <div className={styles.formGroup2}>
              <label htmlFor="end1" className={styles.required}>End 1</label>
              <select 
                id="end1" 
                name="end1"
                onChange={e => setEnd1(e.target.value)}
                value={end1}
                required
                
              >
                <option key="none" value="" disabled></option>
                {end1Options.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}

              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="room1" className={styles.required}>Room1</label>
              <input 
                type="text"
                id="room1" 
                className={styles.inputText}
                onChange={e => setRoom1(e.target.value)}
                value={room1}
                required
                
              />
            </div>
          </div>

          <div className={styles.formRow} >
            <div className={styles.formGroup} >
              <label htmlFor="day2" >Day 2</label>
              <select 
                id="day2" 
                name="day2"
                onChange={e => setDay2(e.target.value)}
                value={day2}                
              >
                <option key="none" value=""></option>
                <option key="Su" value="Su">Su</option>
                <option key="M" value="M">M</option>
                <option key="T" value="T">T</option>
                <option key="W" value="W">W</option>
                <option key="H" value="H">H</option>
                <option key="F" value="F">F</option>
                <option key="Sa" value="Sa">Sa</option>
              </select>
            </div>

            <div className={styles.formGroup2}>
              <label htmlFor="begin2">Begin 2</label>
              <select 
                id="begin2"
                name="day2"
                onChange={e => setBegin2(e.target.value)}
                value={begin2}
                
              >
                <option key="none" value=""></option>
                <option key="0730" value="730">0730</option>
                <option key="0915" value="915">0915</option>
                <option key="1100" value="1100">1100</option>
                <option key="1245" value="1245">1245</option>
                <option key="1430" value="1430">1430</option>
                <option key="1615" value="1615">1615</option>
                <option key="1800" value="1800">1800</option>
              </select>
            </div>

            <div className={styles.formGroup2}>
              <label htmlFor="end2">End 2</label>
              <select 
                id="end2"
                name="end2"
                onChange={e => setEnd2(e.target.value)}
                value={end2}                
              >
                <option key="none" value=""></option>
                {end2Options.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="room2">Room2</label>
              <input 
                type="text"
                id="room2" 
                className={styles.inputText}
                onChange={e => setRoom2(e.target.value)}  
                value={room2}
                
              />
            </div>
          </div>

          <div className={styles.formRow2}>
            <div className={styles.formGroup}>
              <label htmlFor="enrlCap" className={styles.required}>Enrl Cap</label>
              <input 
                type="number" 
                id="enrlCap" 
                className={styles.inputText}
                onChange={e => setEnrlCap(e.target.value)}  
                value={enrlCap}
                required
                
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="remarks">Remarks</label>
              <input 
                type="text" 
                id="remarks" 
                className={styles.inputText2}
                onChange={e => setRemarks(e.target.value)}
                value={remarks}
                
              />
            </div>
          </div>

          <div className={styles.formButtons}>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={() => setOpenAddCourseModal(false)}
            >
                Cancel
            </button>

            <button type="submit" className={styles.addButton}>Add Course</button>
            
          </div>
        </form>


      </div>
    </div>
  );
}

export default AddCourseModal
