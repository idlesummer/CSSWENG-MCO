import React, {useState} from 'react';
import {Multiselect} from 'multiselect-react-dropdown';
import styles from './Modal.module.css';

import PropTypes from 'prop-types'


function SplitModal ({closeModal, listOfTakers, courseList}) {


    const [options] = useState(
      courseList.map(taker => ({
        ...taker,
        display: `${taker.program}-${taker.batch} (${taker.taker})`
      }))
    );

    const customStyles = {
        searchBox: {
            width: '100%',
            boxSizing: 'border-box',
            padding: '5px',
            fontSize: '16px',
            border: '1px solid #A3B1CC',
            borderRadius: '7px'
        },
        option: {
          color: '#151618',
          padding: '5px 10px',
        },
        optionContainer: {
          maxHeight: '200px',
          overflowY: 'auto',
          flexGrow: '1',
        },
        chips: {
          backgroundColor: '#198754',
          color: '#fff',
          margin: '2px',
          borderRadius: '10px',
          fontSize: '11px',
          fontWeight: 'bold'
        }
      };

    const [toggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
      setToggleState(index);
    }

    const tabContent = courseList.map((course, index) => (
      <div className={`${toggleState === index ? styles.activeContent : styles.content}`}>
        <form key={index}>
          <div className={styles.formRow2}>
            <div className={styles.formGroup}>
              <span className={styles.radioContainer}>
                <label>Takers</label>
                <Multiselect 
                  options={options} 
                  displayValue="display" 
                  style={customStyles}
                />
              </span>
            </div>
          </div>
          <div class={styles.formRow3}>
            <div className={styles.formGroup2}>
              <label htmlFor={`faculty-${index}`} className={styles.required}>Faculty</label>
              <input type="text" id={`faculty-${index}`} className={styles.inputText2} value={course.faculty} readOnly />
            </div>
            <div class={styles.formGroup}>
              <label htmlFor="section" className={styles.required}>Section</label>
              <input type="text" id="section" className={styles.inputText3}/>
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor={`day1-${index}`} className={styles.required}>Day 1</label>
              <select id={`day1-${index}`} name="day1" value={course.day1} readOnly>
                <option value="T">T</option>
              </select>
            </div>
            <div className={styles.formGroup2} id="startTimeBox1">
              <select id={`startTime1-${index}`} name="startTime1" value={course.begin1} readOnly>
                <option value="1300">1300</option>
              </select>
            </div>
            <div className={styles.formGroup2}>
              <select id={`endTime1-${index}`} name="endTime1" value={course.end1} readOnly>
                <option value="1500">1500</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor={`room1-${index}`} className={styles.required}>Room1</label>
              <input type="text" id={`room1-${index}`} className={styles.inputText} value={course.room1} readOnly />
            </div>
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor={`day2-${index}`}>Day 2</label>
              <select id={`day2-${index}`} name="day2" value={course.day2} readOnly>
                <option value="F">F</option>
              </select>
            </div>
            <div className={styles.formGroup2}>
              <label htmlFor={`startTime2-${index}`}></label>
              <select id={`startTime2-${index}`} value={course.begin2} readOnly>
                <option value="1300">1300</option>
              </select>
            </div>
            <div className={styles.formGroup2}>
              <label htmlFor={`endTime2-${index}`}></label>
              <select id={`endTime2-${index}`} value={course.end2} readOnly>
                <option value="1500">1500</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor={`room2-${index}`}>Room2</label>
              <input type="text" id={`room2-${index}`} className={styles.inputText} value={course.room2} readOnly />
            </div>
          </div>
          <div className={styles.formRow2}>
            <div className={styles.formGroup}>
              <label htmlFor={`enrlCap-${index}`} className={styles.required}>Enrl Cap</label>
              <select id={`enrlCap-${index}`} value={course.enrl_cap} readOnly>
                <option value="40">40</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor={`remarks-${index}`}>Remarks</label>
              <input type="text" id={`remarks-${index}`} className={styles.inputText2} value={course.remarks} readOnly />
            </div>
          </div>
          <div className={styles.formButtons}>
            <button type="submit" className={styles.cancelButton} onClick={closeModal}>Cancel</button>
            <button type="submit" className={styles.saveButton}>Save</button>
          </div>
        </form>
      </div>
    ));

    console.log('tabContent:', tabContent);
    return(
      <div className={styles.modalOverlay}>
        <div className={styles.modalDiv}>
          <div class={styles.tabs}>
            <div className={`${styles.tab} ${toggleState === 0 && styles.active}`} onClick={() =>toggleTab(0)} >GEFTWEL XX22</div>
            <div className={`${styles.tab} ${toggleState === 1 && styles.active}`} onClick={() =>toggleTab(1)}>GEFTWEL SAMPLE</div>
          </div>
          
          <div className={styles.contentTabs}>
            {tabContent}
          </div>  
        </div>
      </div>

    );
};

SplitModal.propTypes = {
    listOfTakers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        code: PropTypes.string,
        takers: PropTypes.number
      })
    )
}

export default SplitModal