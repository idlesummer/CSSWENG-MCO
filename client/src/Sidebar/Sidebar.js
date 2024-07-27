import styles from './Sidebar.module.css'

import { Link } from 'react-router-dom';

function Sidebar() {

    return(
        <div className={styles.sidebar}>
            <div className={styles.menu}>
                <Link to="/"><div><i className={styles.icon}><img src="/img/icons/home.png" alt="Home"></img></i></div></Link>
                <Link to="/offeringspage"><div><i className={styles.icon}><img src="/img/icons/card-text.png" alt="table"></img></i></div></Link>
                <div><i className={styles.icon}><img src="/img/icons/box-arrow-up.png" alt="arrow up"></img></i></div>
                <div><i className={styles.icon}><img src="/img/icons/box-arrow-down.png" alt="arrow down"></img></i></div>
                <div className={styles.lastItem}><i className={styles.icon}><img src="/img/icons/power.png" alt="power"></img></i></div>
            </div>
        </div>
    );

}

export default Sidebar