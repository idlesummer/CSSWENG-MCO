import styles from './Sidebar.module.css'

function Sidebar() {

    return(
        <div className={styles.sidebar}>
            <div class={styles.menu}>
                <div><i class={styles.icon}>H</i></div>
                <div><i class={styles.icon}>📄</i></div>
                <div><i class={styles.icon}>📤</i></div>
                <div><i class={styles.icon}>📥</i></div>
                <div className={styles.lastItem}><i class={styles.icon}>🔌</i></div>
            </div>
        </div>
    );

}

export default Sidebar