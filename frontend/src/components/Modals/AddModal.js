import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";

import styles from './Modal.module.css';


function AddModal({ setOpenAddModal, openAddModal, fromCourseOfferings, courseInfo }) {

  console.log(courseInfo)
  const [programCode, setProgramCode] = useState("");
  const [programName, setProgramName] = useState("");
  const [batch, setBatch] = useState("");
  const [takers, setTakers] = useState("");

  const [code, setCode] = useState(courseInfo.courseCode);
  const [title, setTitle] = useState(courseInfo.courseTitle);
  const [section, setSection] = useState(courseInfo.section);

  const [faculty, setFaculty] = useState(courseInfo.faculty);

  const [day1, setDay1] = useState(courseInfo.day1);
  const [begin1, setBegin1] = useState(courseInfo.begin1);
  const [end1, setEnd1] = useState(courseInfo.end1);
  const [room1, setRoom1] = useState(courseInfo.room1);

  const [day2, setDay2] = useState(courseInfo.day2);
  const [begin2, setBegin2] = useState(courseInfo.begin2);
  const [end2, setEnd2] = useState(courseInfo.end2);
  const [room2, setRoom2] = useState(courseInfo.room2);

  const [enrlCap, setEnrlCap] = useState(courseInfo.enrlCap);
  const [remarks, setRemarks] = useState(courseInfo.remarks);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [end1Options, setEnd1Options] = useState([]);
  const [end2Options, setEnd2Options] = useState([]);

  const programMapping = useMemo(
    () => ({
      "BSCS-ST": "BS Computer Science Major in Software Technology",
      "BSIS": "BS Information Systems",
      "BSIET-GD": "BS Interactive Entertainment major in Game Development",
      "BSIET-AD": "BS Interactive Entertainment major in Game Design",
    }),
    []
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    const courseId = courseInfo._id;
    const taker = {
      courseId,
      programCode,
      programName,
      batch,
      takers
    };

    console.log(taker);
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/course-offerings`, {
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
    navigate(0);
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

  useEffect(() => {
    setProgramName(programMapping[programCode] || '');
    return () => {}
  }, [programCode]);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.headers}>
          <h2>Add Program to {code} {section} </h2>
        </div>

        <form onSubmit={onSubmit}>
          {fromCourseOfferings && (
          <div className={styles.formRow5}>
            <div className={styles.formGroup2}>
                <label htmlFor="programCode" className={styles.required}>Program Code</label>
                <select
                  type="text" 
                  id="programCode" 
                  className={styles.inputText}
                  onChange={e => setProgramCode(e.target.value)}
                  value={programCode}
                  required
                >
                  <option key="none" value="" disabled></option>
                  <option key="BSCS-ST" value="BSCS-ST">BSCS-ST</option>
                  <option key="BSIS" value="BSIS">BSIS</option>
                  <option key="BSIET-GD" value="BSIET-GD">BSIET-GD</option>
                  <option key="BSIET-AD" value="BSIET-AD">BSIET-AD</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="programName" className={styles.required}>Program Name</label>
                <input 
                  type="text" 
                  id="programName" 
                  className={styles.inputText2}
                  onChange={e => setProgramName(e.target.value)}
                  value={programName}
                  required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="batch" className={styles.required}>Batch</label>
                <select 
                id="batch" 
                name="batch"
                className={styles.inputText2}
                onChange={e => setBatch(e.target.value)}
                value={batch}
                required
                >
                  <option key="none" value="" disabled></option>
                  <option key={120} value={120}>120</option>
                  <option key={121} value={121}>121</option>
                  <option key={122} value={122}>122</option>
                  <option key={123} value={123}>123</option>
                  <option key={124} value={124}>124</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="takers"className={styles.required}>Takers</label>
              <input
                type="number"
                id="takers"
                className={styles.inputText2}
                onChange={e => setTakers(e.target.value)}
                value={takers}
                required
              />
            </div>
          </div>
          )}

          <div className={styles.formButtons}>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={() => setOpenAddModal(false)}
            >
                Cancel
            </button>

            <button type="submit" className={styles.addButton}>Add Program</button>
            
          </div>
        </form>
        <div className={styles.viewOnly}>
          <div className={styles.formRow1}>
            <div className={styles.formGroup2}>
                <label htmlFor="name" >Course Code</label>
                <input 
                  type="text" 
                  id="name" 
                  className={styles.inputText}
                  onChange={e => setCode(e.target.value)}
                  value={code}
                  required
                  readOnly
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="title" >Course Title</label>
                <input 
                  type="text" 
                  id="title" 
                  className={styles.inputText2}
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                  required
                  readOnly
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="section" >Section</label>
                <input 
                  type="text" 
                  id="section" 
                  className={styles.inputText3}
                  onChange={e => setSection(e.target.value)}
                  value={section}
                  required
                  readOnly
                />
            </div>
          </div>

          <div className={styles.formRow4}>
            <div className={styles.formGroup}>
              <label htmlFor="faculty" >Faculty</label>
              <input 
                type="text" 
                id="faculty" 
                className={styles.inputText2}
                onChange={e => setFaculty(e.target.value)}
                value={faculty}
                required
                readOnly
              />
            </div>

          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="day1" >Day 1</label>
              <select 
                id="day1" 
                name="day1"
                onChange={e => setDay1(e.target.value)}
                value={day1}
                required
                readOnly
                disabled
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
              <label htmlFor="begin1">Begin 1</label>
              <select 
                id="begin1" 
                name="begin1"
                onChange={e => setBegin1(e.target.value)}
                value={begin1}
                required
                readOnly
                disabled
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
              <label htmlFor="end1">End 1</label>
              <select 
                id="end1" 
                name="end1"
                onChange={e => setEnd1(e.target.value)}
                value={end1}
                required
                readOnly
                disabled
              >
                <option key="none" value="" disabled></option>
                {end1Options.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
                {/* <option key="0900" value="0900">0900</option>
                <option key="1045" value="1045">1045</option>
                <option key="1230" value="1230">1230</option>
                <option key="1415" value="1415">1415</option>
                <option key="1600" value="1600">1600</option>
                <option key="1745" value="1745">1745</option>
                <option key="1930" value="1930">1930</option> */}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="room1" >Room1</label>
              <input 
                type="text"
                id="room1" 
                className={styles.inputText}
                onChange={e => setRoom1(e.target.value)}
                value={room1}
                required
                readOnly
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="day2">Day 2</label>
              <select 
                id="day2" 
                name="day2"
                onChange={e => setDay2(e.target.value)}
                value={day2}
                readOnly
                disabled
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
                readOnly
                disabled
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
                disabled
                readOnly
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
                readOnly
              />
            </div>
          </div>

          <div className={styles.formRow2}>
            <div className={styles.formGroup}>
              <label htmlFor="enrlCap">Enrl Cap</label>
              <input 
                type="number" 
                id="enrlCap" 
                className={styles.inputText}
                onChange={e => setEnrlCap(e.target.value)}  
                value={enrlCap}
                required
                readOnly
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
                readOnly
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AddModal
