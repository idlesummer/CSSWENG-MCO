import styles from './Sidebar.module.css'

function Sidebar() {

    return(
        <div className={styles.sidebar}>
            <div className={styles.menu}>
                <div><i className={styles.icon}><img src="/img/icons/home.png" alt="Home"></img></i></div>
                <div><i className={styles.icon}><img src="/img/icons/card-text.png" alt="table"></img></i></div>
                <div><i className={styles.icon}><img src="/img/icons/box-arrow-up.png" alt="arrow up"></img></i></div>
                <div><i className={styles.icon}><img src="/img/icons/box-arrow-down.png" alt="arrow down"></img></i></div>
                <div className={styles.lastItem}><i className={styles.icon}><img src="/img/icons/power.png" alt="power"></img></i></div>
            </div>
        </div>
    );

}

export default Sidebar