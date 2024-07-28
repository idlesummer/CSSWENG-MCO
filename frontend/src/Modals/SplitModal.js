import React, {useState} from 'react';
import {Multiselect} from 'multiselect-react-dropdown';
import styles from './Modal.module.css';

import PropTypes from 'prop-types'


function SplitModal ({closeModal, listOfTakers}) {

    console.log('takersList:', listOfTakers);

    const [options] = useState(
        listOfTakers.map(taker => ({
          ...taker,
          display: `${taker.code} (${taker.takers})`
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

    return(
        <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.headers}>
            <h2>
             <span className={styles.lightText}>Merge</span> <span className={styles.boldText}>GEFTWEL XX22</span> <span className={styles.lightText}>and</span> <span className={styles.boldText}> GEFTWEL XXE1</span>
            </h2>
          </div>
          <form>
            <div className={styles.formGroup}>
                <span className={styles.radioContainer}>
                    <label> Takers </label>
                    <Multiselect 
                        options ={options} 
                        displayValue="display" 
                        style={customStyles}
                    />
                </span>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="faculty" className={styles.required}>Faculty</label>
              <input type="text" id="faculty" className={styles.inputText2}/>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="day1" className={styles.required}>Day 1</label>
                <select id="day1" name="day1">
                  <option value="T">T</option>
                </select>
              </div>
              <div className={styles.formGroup2} id="startTimeBox1">
                <select id="startTime1" name="startTime1">
                  <option value="1300">1300</option>
                </select>
              </div>
              <div className={styles.formGroup2}>
                <select id="endTime1" name="endTime1">
                  <option value="1500">1500</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="room1" className={styles.required}>Room1</label>
                <input type="text" id="room1" className={styles.inputText}/>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="day2">Day 2</label>
                <select id="day2" name="day2">
                  <option value=""></option>
                </select>
              </div>
              <div className={styles.formGroup2}>
                <label htmlFor="startTime2"></label>
                <select id="startTime2">
                  <option value=""></option>
                </select>
              </div>
              <div className={styles.formGroup2}>
                <label htmlFor="endTime2"></label>
                <select id="endTime2" >
                  <option value=""></option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="room2">Room2</label>
                <input type="text" id="room2" className={styles.inputText}/>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="enrlCap" className={styles.required}>Enrl Cap</label>
                <select id="enrlCap" >
                  <option value="40">40</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="remarks">Remarks</label>
                <input type="text" id="remarks" className={styles.inputText2}/>
              </div>
            </div>
            <div className={styles.formButtons}>
              <button type="submit" className={styles.cancelButton}>Cancel</button>
              <button type="submit" className={styles.saveButton}>Save</button>
            </div>
          </form>
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