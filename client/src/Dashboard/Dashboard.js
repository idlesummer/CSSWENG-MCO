import Sidebar from '../Sidebar/Sidebar.js'
import styles from './Dashboard.module.css'

function Dashboard() {

    return(
        <div className={styles.container}>
            <Sidebar/>
            <div class={styles.content}>
                <div class={styles.item}>
                    <div class={styles.itemHeader} id="">ID124</div>
                    <ul class={styles.itemList}>
                        <li>BS Interactive Entertainment major in Game Design</li>
                        <li>BS Interactive Entertainment major in Game Development</li>
                        <li>BS Information Systems</li>
                        <li>BS Computer Science major in Software Technology</li>
                    </ul>
                </div>
                <div class={styles.item}>
                    <div class={styles.itemHeader} id="">ID123</div>
                    <ul class={styles.itemList}>
                        <li>BS Interactive Entertainment major in Game Design</li>
                        <li>BS Interactive Entertainment major in Game Development</li>
                        <li>BS Information Systems</li>
                        <li>BS Computer Science major in Software Technology</li>
                    </ul>
                </div>

            </div>
        </div>
    );

}

export default Dashboard 