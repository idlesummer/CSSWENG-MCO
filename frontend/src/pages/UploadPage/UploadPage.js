import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Sidebar from '../../components/Sidebar/Sidebar.js';
import styles from './UploadPage.module.css';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Validate file type
    if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please select a valid .xlsx file.');
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError('No file selected. Please choose a .xlsx file to upload.');
      return;
    }
    console.log('Uploading file:', file);
    setFile(null);
    setError('');
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.uploadWrapper}>
          <h1 className={styles.title}>Upload .xlsx File</h1>

          <div className={styles.controls}>
            <input
              id="file-upload"
              type="file"
              accept=".xlsx"
              className={styles.fileInput}
              onChange={handleFileChange}
            />
            <button className={styles.uploadButton} onClick={handleUpload}>
              Upload
            </button>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.progressBarWrapper}>
            <div className={styles.progressBar}>
              <div className={styles.progress}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
