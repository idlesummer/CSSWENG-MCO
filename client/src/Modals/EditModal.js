import React from 'react';
import styles from './Modal.module.css';

function EditModal({closeModal}) {

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.headers}>
            <h2>GEFTWEL</h2>
            <h2>XX22</h2>
        </div>
        <div className={styles.group1}>
            <div>
                <p>Faculty *</p>
            </div>
            <div className={styles.searchBar}>
                <input type="text"/>
            </div>
        </div>
        <div className={styles.group2}>
            <div>
                <p>Day 1 *</p>
                <div className={styles.selectDay}>
                    <input type="text" id="textInput" placeholder="Type or select..."></input>
                    <select id="selectBox"></select>
                </div>
            </div>
            <div className={styles.selectTime1}>
                <input type="text" id="textInput" placeholder="Type or select..."></input>
                <select id="selectBox"></select>
            </div>

        </div>
    
        <button onClick={() => closeModal(false)}>Close Modal</button>
      </div>
    </div>
  );
};

export default EditModal;