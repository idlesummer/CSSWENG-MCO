import React from 'react';
import styles from './Modal.module.css';

function MergeModal({closeModal}) {
    return(
        <div class={styles.modalOverlay}>
        <div class={styles.modalContent}>
          <div className={styles.headers}>
            <h2>
             <span className={styles.lightText}>Merge</span> <span className={styles.boldText}>GEFTWEL XX22</span> <span className={styles.lightText}>and</span> <span className={styles.boldText}> GEFTWEL XXE1</span>
            </h2>
          </div>
          <form>
            <div class={styles.formGroup}>
                <span className={styles.radioContainer}>
                    <label>Merge into</label>
                    <div class={styles.radioGroup}>
                        <input type="radio" id="geftwelXX22" name="mergeInto" value="XX22"/>
                        <label htmlFor="geftwelXX22">GEFTWEL XX22</label>
                        <input type="radio" id="geftwelXXE1" name="mergeInto" value="XXE1"/>
                        <label htmlFor="geftwelXXE1">GEFTWEL XXE1</label>
                    </div>
                </span>
            </div>
            <div class={styles.formGroup}>
              <label htmlFor="faculty" className={styles.required}>Faculty</label>
              <input type="text" id="faculty" className={styles.inputText2}/>
            </div>
            <div class={styles.formRow}>
              <div class={styles.formGroup}>
                <label htmlFor="day1" className={styles.required}>Day 1</label>
                <select id="day1" name="day1">
                  <option value="T">T</option>
                </select>
              </div>
              <div class={styles.formGroup2} id="startTimeBox1">
                <select id="startTime1" name="startTime1">
                  <option value="1300">1300</option>
                </select>
              </div>
              <div class={styles.formGroup2}>
                <select id="endTime1" name="endTime1">
                  <option value="1500">1500</option>
                </select>
              </div>
              <div class={styles.formGroup}>
                <label htmlFor="room1" className={styles.required}>Room1</label>
                <input type="text" id="room1" className={styles.inputText}/>
              </div>
            </div>
            <div class={styles.formRow}>
              <div class={styles.formGroup}>
                <label htmlFor="day2">Day 2</label>
                <select id="day2" name="day2">
                  <option value=""></option>
                </select>
              </div>
              <div class={styles.formGroup2}>
                <label htmlFor="startTime2"></label>
                <select id="startTime2">
                  <option value=""></option>
                </select>
              </div>
              <div class={styles.formGroup2}>
                <label htmlFor="endTime2"></label>
                <select id="endTime2" >
                  <option value=""></option>
                </select>
              </div>
              <div class={styles.formGroup}>
                <label htmlFor="room2">Room2</label>
                <input type="text" id="room2" className={styles.inputText}/>
              </div>
            </div>
            <div class={styles.formRow}>
              <div class={styles.formGroup}>
                <label htmlFor="enrlCap" className={styles.required}>Enrl Cap</label>
                <select id="enrlCap" >
                  <option value="40">40</option>
                </select>
              </div>
              <div class={styles.formGroup}>
                <label htmlFor="remarks">Remarks</label>
                <input type="text" id="remarks" className={styles.inputText2}/>
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

export default MergeModal

