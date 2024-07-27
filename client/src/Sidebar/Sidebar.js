import styles from './Sidebar.module.css'

function Sidebar() {

    return(
        <div className={styles.sidebar}>
            <ul class={styles.menu}>
                <li><i class={styles.icon}>H</i></li>
                <li><i class={styles.icon}>📄</i></li>
                <li><i class={styles.icon}>📤</i></li>
                <li><i class={styles.icon}>📥</i></li>
                <li><i class={styles.icon}>🔌</i></li>
            </ul>
        </div>
    );

}

export default Sidebar