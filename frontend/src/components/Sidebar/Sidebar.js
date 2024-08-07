import styles from './Sidebar.module.css'

import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {

  const fetchCourseOfferings = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/download`);
    // const res = await fetch(`http://localhost:4000/api/course-offerings`);
    console.log(res);  
  }


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

      <Link to ="/login" className={styles.lastItem}>
        <div className={styles.lastItem}><i className={styles.icon}><img src="/img/icons/power.png" alt="power"></img></i></div>
      </Link>

  </div>
</div>
);

}

export default Sidebar