import styles from './Sidebar.module.css'

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {

  const fetchCourseOfferings = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/download`, {
      method: 'GET',
      // No need to specify Content-Type for a GET request downloading binary data
    });

    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.statusText}`);
    }

    // Convert the response to a Blob
    const blob = await response.blob();

    // Create a URL for the Blob and set it as the href attribute of an anchor element
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'course_offerings.xlsx'; // Name of the file to be downloaded
    document.body.appendChild(a);
    a.click();

    // Clean up by removing the link element and revoking the Blob URL
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    console.log('File downloaded successfully');
  } catch (error) {
    console.error('Error downloading the file:', error);
  }
};



return (
  <div className={styles.sidebar}>
    <div className={styles.menu}>
      <Link to="/">
        <div><i className={styles.icon}><img src="/img/icons/home.png" alt="Home"></img></i></div>
      </Link>
      
      <Link to="/course-offerings">
        <div><i className={styles.icon}><img src="/img/icons/card-text.png" alt="table"></img></i></div>
      </Link>
      
      <Link to ="/upload">
      <div><i className={styles.icon}><img src="/img/icons/box-arrow-up.png" alt="arrow up"></img></i></div>
      </Link>

      <div onClick={() => fetchCourseOfferings() }><i className={styles.icon}><img src="/img/icons/box-arrow-down.png" alt="arrow down"></img></i></div>

  </div>
</div>
);

}

export default Sidebar