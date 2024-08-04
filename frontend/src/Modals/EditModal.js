import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from "react-router-dom";

import styles from './Modal.module.css';

function EditModal({closeModal, courseInfo}) {
  
  console.table(courseInfo)

  const [code, setCode] = useState(courseInfo.code);
  const [title, setTitle] = useState(courseInfo.title);
  const [section, setSection] = useState(courseInfo.section);
  
  const [faculty, setFaculty] = useState(courseInfo.faculty);
  const [takers, setTakers] = useState(courseInfo.takers);

  const [day1, setDay1] = useState(courseInfo.day1);
  const [begin1, setBegin1] = useState(courseInfo.begin1);
  const [end1, setEnd1] = useState(courseInfo.end1);
  const [room1, setRoom1] = useState(courseInfo.room1);

  const [day2, setDay2] = useState(courseInfo.day2);
  const [begin2, setBegin2] = useState(courseInfo.begin2);
  const [end2, setEnd2] = useState(courseInfo.end2);
  const [room2, setRoom2] = useState(courseInfo.room2);

  const [enrlCap, setEnrlCap] = useState(courseInfo.enrl_cap);
  const [remarks, setRemarks] = useState(courseInfo.remarks);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [end1Options, setEnd1Options] = useState([]);
  const [end2Options, setEnd2Options] = useState([]);

  const timeMapping = useMemo(
    () => ({
      "0730": ["0900", "1045"],
      "0915": ["1045", "1230"],
      "1100": ["1230", "1415"],
      "1245": ["1415", "1600"],
      "1430": ["1600", "1745"],
      "1615": ["1745", "1930"],
      "1800": ["1930"],
    }),
    []
  );


  useEffect(() => {
    setEnd1("");
    setEnd1Options(timeMapping[begin1] || []);

    return () => {}
  }, [begin1, timeMapping]);

  useEffect(() => {
    setEnd2Options(timeMapping[begin2] || []);

    return () => {}
  }, [begin2, timeMapping]);


  return (
    <div class={styles.modalOverlay}>
      <div class={styles.modalContent}>
        <div className={styles.headers}>
          <h2>{code}</h2>
          <h2>{section}</h2>
        </div>
        <form>
          <div class={styles.formRow3}>
            <div class={styles.formGroup2}>
              <label htmlFor="faculty" className={styles.required}>Faculty</label>
              <input 
                type="text" 
                id="faculty" 
                className={styles.inputText2}
                onChange={e => setFaculty(e.target.value)} 
                value={faculty}/>
            </div>
            <div class={styles.formGroup}>
              <label htmlFor="section" className={styles.required}>Section</label>
              <input 
                type="text" 
                id="section" 
                className={styles.inputText3} 
                onChange={e => setSection(e.target.value)}
                value={section}/>
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
              <label htmlFor="begin1"className={styles.required}>Begin 1</label>
              <select 
                id="begin1" 
                name="begin1"
                onChange={e => setBegin1(e.target.value)}
                value={begin1}
                required
              >
                <option key="none" value="" disabled></option>
                <option key="0730" value="0730">0730</option>
                <option key="0915" value="0915">0915</option>
                <option key="1100" value="1100">1100</option>
                <option key="1245" value="1245">1245</option>
                <option key="1430" value="1430">1430</option>
                <option key="1615" value="1615">1615</option>
                <option key="1800" value="1800">1800</option>
              </select>
            </div>

            <div className={styles.formGroup2}> 
              <label htmlFor="end1" className={styles.required} >End 1</label>
              <select 
                id="end1" 
                name="end1"
                onChange={e => setEnd1(e.target.value)}
                value={end1}
                required
                disabled={!begin1}
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

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="day2">Day 2</label>
              <select 
                id="day2" 
                name="day2"
                onChange={e => setDay2(e.target.value)}
                value={day2}
              >
                <option key="none" value=""></option>
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
                name="begin2"
                onChange={e => setBegin2(e.target.value)}
                value={begin2}
              >
                <option key="none" value=""></option>
                <option key="0730" value="0730">0730</option>
                <option key="0915" value="0915">0915</option>
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
          <div class={styles.formButtons}>
            <button type="submit" class={styles.cancelButton}>Cancel</button>
            <button type="submit" class={styles.saveButton}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;