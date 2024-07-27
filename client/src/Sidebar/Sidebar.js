import styles from './Sidebar.module.css'

function Sidebar() {

    return(
        <div className={styles.sidebar}>
            <div className={styles.menu}>
                <div><i className={styles.icon}>H</i></div>
                <div><i className={styles.icon}>📄</i></div>
                <div><i className={styles.icon}>📤</i></div>
                <div><i className={styles.icon}>📥</i></div>
                <div className={styles.lastItem}><i className={styles.icon}>🔌</i></div>
            </div>
        </div>
    );

}

export default Sidebar