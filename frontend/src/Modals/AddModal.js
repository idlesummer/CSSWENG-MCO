import { useState } from 'react';
import styles from './Modal.module.css';

function AddModal() {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [section, setSection] = useState("");
  const [faculty, setFaculty] = useState("");
  const [day1, setDay1] = useState("");
  const [startTime1, setStartTime1] = useState("");
  const [endTime1, setEndTime1] = useState("");
  const [room1, setRoom1] = useState("");
  const [day2, setDay2] = useState("");
  const [startTime2, setStartTime2] = useState("");
  const [endTime2, setEndTime2] = useState("");
  const [room2, setRoom2] = useState("");
  const [enrlCap, setEnrlCap] = useState("");
  const [remarks, setRemarks] = useState("");

  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();

    const offering = {
      code,
      title,
      section,
      faculty,
      day1,
      startTime1,
      endTime1,
      room1,
      day2,
      startTime2,
      endTime2,
      room2,
      enrlCap,
      remarks,
    }

    const response = await fetch("http://localhost:4000/api/offerings", {
      method: "POST",
      body: JSON.stringify(offering),
      headers: {
        "Content-Type": "application/json",
      }
    });

    const json = await response.json();

    if (!response.ok)
      return setError(json.error);

    console.table(json);

    setCode('');
    setTitle('');
    setSection('');
    setFaculty('');
    setDay1('');
    setStartTime1('');
    setEndTime1('');
    setRoom1('');
    setDay2('');
    setStartTime2('');
    setEndTime2('');
    setRoom2('');
    setEnrlCap('');
    setRemarks('');
  };


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.headers}>
          <h2>Add Class </h2>
        </div>

        <form onSubmit={onSubmit}>

          <div className={styles.formRow1}>
            <div className={styles.formGroup2}>
                <label htmlFor="name" className={styles.required}>Course Code</label>
                <input 
                  type="text" 
                  id="name" 
                  className={styles.inputText}
                  onChange={e => setCode(e.target.value)}
                  value={code}
                  required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.required}>Course Title</label>
                <input 
                  type="text" 
                  id="title" 
                  className={styles.inputText2}
                  onChange={e => setTitle(e.target.value)}
                  value={title}
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

          <div className={styles.formGroup}>
            <label htmlFor="faculty" className={styles.required}>Faculty</label>
            <input 
              type="text" 
              id="faculty" 
              className={styles.inputText2}
              onChange={e => setFaculty(e.target.value)}
              value={faculty}
              required
            />
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
                <option key="Su" value="Su">Su</option>
                <option key="M" value="M">M</option>
                <option key="T" value="T">T</option>
                <option key="W" value="W">W</option>
                <option key="Th" value="Th">Th</option>
                <option key="F" value="F">F</option>
                <option key="Sa" value="Sa">Sa</option>
              </select>
            </div>

            <div className={styles.formGroup2} id="startTimeBox1">
              <select 
                id="startTime1" 
                name="startTime1"
                onChange={e => setStartTime1(e.target.value)}
                value={startTime1}
                required
              >
                <option key="none" value="" disabled></option>
                <option key="0730" value="0730">0730</option>
                <option key="0900" value="0900">0900</option>
                <option key="0915" value="0915">0915</option>
                <option key="1045" value="1045">1045</option>
                <option key="1100" value="1100">1100</option>
                <option key="1230" value="1230">1230</option>
                <option key="1245" value="1245">1245</option>
                <option key="1415" value="1415">1415</option>
                <option key="1430" value="1430">1430</option>
                <option key="1600" value="1600">1600</option>
                <option key="1615" value="1615">1615</option>
                <option key="1745" value="1745">1745</option>
                <option key="1800" value="1800">1800</option>
                <option key="1930" value="1930">1930</option>
              </select>
            </div>

            <div className={styles.formGroup2}>
              <select 
                id="endTime1" 
                name="endTime1"
                onChange={e => setEndTime1(e.target.value)}
                value={endTime1}
                required
              >
                <option key="none" value="" disabled></option>
                <option key="0730" value="0730">0730</option>
                <option key="0900" value="0900">0900</option>
                <option key="0915" value="0915">0915</option>
                <option key="1045" value="1045">1045</option>
                <option key="1100" value="1100">1100</option>
                <option key="1230" value="1230">1230</option>
                <option key="1245" value="1245">1245</option>
                <option key="1415" value="1415">1415</option>
                <option key="1430" value="1430">1430</option>
                <option key="1600" value="1600">1600</option>
                <option key="1615" value="1615">1615</option>
                <option key="1745" value="1745">1745</option>
                <option key="1800" value="1800">1800</option>
                <option key="1930" value="1930">1930</option>
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
                <option key="Su" value="Su">Su</option>
                <option key="M" value="M">M</option>
                <option key="T" value="T">T</option>
                <option key="W" value="W">W</option>
                <option key="Th" value="Th">Th</option>
                <option key="F" value="F">F</option>
                <option key="Sa" value="Sa">Sa</option>
              </select>
            </div>

            <div className={styles.formGroup2}>
              <label htmlFor="startTime2"></label>
              <select 
                id="startTime2"
                name="day2"
                onChange={e => setStartTime2(e.target.value)}
                value={startTime2}
              >
                <option key="none" value=""></option>
                <option key="0730" value="0730">0730</option>
                <option key="0900" value="0900">0900</option>
                <option key="0915" value="0915">0915</option>
                <option key="1045" value="1045">1045</option>
                <option key="1100" value="1100">1100</option>
                <option key="1230" value="1230">1230</option>
                <option key="1245" value="1245">1245</option>
                <option key="1415" value="1415">1415</option>
                <option key="1430" value="1430">1430</option>
                <option key="1600" value="1600">1600</option>
                <option key="1615" value="1615">1615</option>
                <option key="1745" value="1745">1745</option>
                <option key="1800" value="1800">1800</option>
                <option key="1930" value="1930">1930</option>
              </select>
            </div>

            <div className={styles.formGroup2}>
              <label htmlFor="endTime2"></label>
              <select 
                id="endTime2"
                name="endTime2"
                onChange={e => setEndTime2(e.target.value)}
                value={endTime2}
              >
                <option key="none" value=""></option>
                <option key="0730" value="0730">0730</option>
                <option key="0900" value="0900">0900</option>
                <option key="0915" value="0915">0915</option>
                <option key="1045" value="1045">1045</option>
                <option key="1100" value="1100">1100</option>
                <option key="1230" value="1230">1230</option>
                <option key="1245" value="1245">1245</option>
                <option key="1415" value="1415">1415</option>
                <option key="1430" value="1430">1430</option>
                <option key="1600" value="1600">1600</option>
                <option key="1615" value="1615">1615</option>
                <option key="1745" value="1745">1745</option>
                <option key="1800" value="1800">1800</option>
                <option key="1930" value="1930">1930</option>
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
                type="text" 
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
              onClick={e => 1}
            >Cancel</button>

            <button type="submit" className={styles.addButton}>Add Class</button>
            
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddModal
