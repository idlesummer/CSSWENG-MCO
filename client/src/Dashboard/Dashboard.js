import Sidebar from '../Sidebar/Sidebar.js'
import styles from './Dashboard.module.css'

function Dashboard() {

    return(
        <body>

        
        <div className={styles.container}>
            <Sidebar/>

            <div className={styles.content}>
                <div className={styles.item}>
                    <div className={styles.itemHeader} id="">ID124</div>
                    <ul className={styles.itemList}>
                        <li>BS Interactive Entertainment major in Game Design</li>
                        <li>BS Interactive Entertainment major in Game Development</li>
                        <li>BS Information Systems</li>
                        <li>BS Computer Science major in Software Technology</li>
                    </ul>
                </div>
                <div className={styles.item}>
                    <div className={styles.itemHeader} id="">ID123</div>
                    <ul className={styles.itemList}>
                        <li>BS Interactive Entertainment major in Game Design</li>
                        <li>BS Interactive Entertainment major in Game Development</li>
                        <li>BS Information Systems</li>
                        <li>BS Computer Science major in Software Technology</li>
                    </ul>
                </div>

            </div>
        </div>
        </body>
    );

}

export default Dashboard 