import React, {useState, useEffect, useMemo} from 'react';
import styles from './Modal.module.css';

function MergeModal({setOpenMergeModal, openMergeModal, courseList}) {

    console.log("Merge Modal", courseList[0])

    const [code, setCode] = useState(courseList[0].code);
    const [title, setTitle] = useState(courseList[0].title);
    const [section, setSection] = useState(courseList[0].section);
    
    const [faculty, setFaculty] = useState(courseList[0].faculty);
    const [takers, setTakers] = useState(courseList[0].takers);
  
    const [day1, setDay1] = useState(courseList[0].day1);
    const [begin1, setBegin1] = useState(courseList[0].begin1);
    const [end1, setEnd1] = useState(courseList[0].end1);
    const [room1, setRoom1] = useState(courseList[0].room1);
  
    const [day2, setDay2] = useState(courseList[0].day2);
    const [begin2, setBegin2] = useState(courseList[0].begin2);
    const [end2, setEnd2] = useState(courseList[0].end2);
    const [room2, setRoom2] = useState(courseList[0].room2);
  
    const [enrlCap, setEnrlCap] = useState(courseList[0].enrl_cap);
    const [remarks, setRemarks] = useState(courseList[0].remarks);
    //const navigate = useNavigate();
  
    const [error, setError] = useState(null);
    const [end1Options, setEnd1Options] = useState([]);
    const [end2Options, setEnd2Options] = useState([]);
    
    const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
    const [toggleState, setToggleState] = useState(1);

    console.log(code, section)

    const handleRadioChange = (index) => {
      setSelectedCourseIndex(index);
      if (index !== null && courseList[index]) {
        const course = courseList[index];
        setFaculty(course.faculty || '');
        setDay1(course.day1 || '');
        setBegin1(course.begin1 || '');
        setEnd1(course.end1 || '');
        setRoom1(course.room1 || '');
        setDay2(course.day2 || '');
        setBegin2(course.begin2 || '');
        setEnd2(course.end2 || '');
        setRoom2(course.room2 || '');
        setEnrlCap(course.enrlCap || '');
        setRemarks(course.remarks || '');
      }
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


    const onSubmit = async (e) => {
      e.preventDefault();
  
      const offering = {
        courseID,
        takers,
  
        code,
        title,
        offered_to,
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
  
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/course-offerings`, {
        method: "PATCH",
        body: JSON.stringify(offering),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const json = await response.json();
  
      if (!response.ok)
        return setError(json.error);
  
      console.table(json);
  
      setCode("");
      setTitle("");
      setSection("");
      setFaculty("");
      setDay1("");
      setBegin1("");
      setEnd1("");
      setRoom1("");
      setDay2("");
      setBegin2("");
      setEnd2("");
      setRoom2("");
      setEnrlCap("");
      setRemarks("");
  
      // Close the modal and navigate to /offerings
      navigate(0);
    };

    return(
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.headers}>
            <h2>
             <span className={styles.lightText}> Merge </span> 
             <span className={styles.boldText}> {code} {section} </span>
              <span className={styles.lightText}> and </span> 
              <span className={styles.boldText}> {courseList[1].code} {courseList[1].section}</span>
            </h2>
          </div>
          <form>
            <div class={styles.formGroup}>
                <span className={styles.radioContainer}>
                    <label>Merge into</label>
                    <div class={styles.radioGroup}>
                        <input type="radio" id="" name="mergeInto" value={courseList[0].section}
                           
                          checked={selectedCourseIndex === 0}
                          onChange={() => handleRadioChange(0)}
                        />
                          <label htmlFor="">{code} {section}</label>
                        <input type="radio" id="" name="mergeInto" value={courseList[1].section}
                         checked={selectedCourseIndex === 1}
                         onChange={() => handleRadioChange(1)}
                        />
                        <label htmlFor="">{courseList[1].code} {courseList[1].section}</label>
                    </div>
                </span>
            </div>
            <div class={styles.formGroup}>
              <label htmlFor="faculty" className={styles.required}>Faculty</label>
              <input type="text" id="faculty" className={styles.inputText2} value={faculty}/>
            </div>
            <div class={styles.formRow}>
              <div class={styles.formGroup}>
                <label htmlFor="day1" className={styles.required}>Day 1</label>
                <select id="day1" name="day1">
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
                  <option key="730" value="730">0730</option>
                  <option key="915" value="915">0915</option>
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
                <option key="730" value="730">0730</option>
                <option key="915" value="915">0915</option>
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
            <div class={styles.formRow2}>
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
              <div class={styles.formGroup}>
                <label htmlFor="remarks">Remarks</label>
                <input 
                  type="text"
                  id="remarks" 
                  className={styles.inputText2}
                  onChange={e => setEnrlCap(e.target.value)}
                  value={remarks}
                />
              </div>
            </div>
            <div class={styles.formButtons}>
              <button 
                type="button" 
                className={styles.cancelButton}
                onClick={() => setOpenMergeModal(false)}
              >
                  Cancel
              </button>
              <button type="submit" class={styles.saveButton}>Save</button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default MergeModal

