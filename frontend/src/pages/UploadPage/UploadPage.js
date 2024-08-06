import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";


import Sidebar from '../../components/Sidebar/Sidebar.js';
import styles from './UploadPage.module.css';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const [uploading, setUploading] = useState(false)

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please select a valid .xlsx file.');
    }
  };

  const handleUpload = async (e) => {
    if (!file) {
      setError('No file selected. Please choose a .xlsx file to upload.');
      return;
    }
    setFile(null);

    const formData = new FormData();
    
    formData.append('file', file);

    setUploading(true)
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/upload`, {
      method: "POST",
      body: formData,
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });

    setUploading(false)
    const json = await response.json();    

    if (!response.ok)
      return setError(json.error);

    navigate('/course-offerings')
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.content}>
        <div className={styles.uploadWrapper}>
          {
            uploading ? (<div className={styles.loading }>Loading...</div>) :
            (          
            <div>

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
            )
          }

        </div>
      </div>
    </div>
  );
}

export default UploadPage;
