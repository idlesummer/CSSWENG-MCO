import Sidebar from '../Sidebar/Sidebar.js'
import styles from './CoursePage.module.css'

function CoursePage(){

    return(
        <body>

        <div className={styles.container}>
            <Sidebar/>
            <div class={styles.content}>
                <h1>ID124 / BSIET-AD</h1>
                <div class={styles.tableWrapper}>
                    <div class={styles.controls}>
                        <div className={styles.searchBar}>
                            <input type="text"/>
                        </div>
                        <div class={styles.iconButtons}>
                            <div className={`${styles.iconButton} ${styles.addIcon}`}></div>
                            <div className={`${styles.iconButton} ${styles.editIcon}`}></div>
                            <div className={`${styles.iconButton} ${styles.deleteIcon}`}></div>
                        </div>
                    </div>
                
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Course Code</th>
                                <th>Course Title</th>
                                <th>Offered To</th>
                                <th>Sect</th>
                                <th>Faculty</th>
                                <th>Day1</th>
                                <th>Begin1</th>
                                <th>End1</th>
                                <th>Day2</th>
                                <th>Begin2</th>
                                <th>End2</th>
                                <th>Room</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td>GEFTWEL</td>
                                <td>Physical Fitness and Wellness</td>
                                <td>X</td>
                                <td>X22</td>
                                <td>TUMALE, MARIA CRISTINA</td>
                                <td>T</td>
                                <td>1300</td>
                                <td>1500</td>
                                <td>F</td>
                                <td>1300</td>
                                <td>1500</td>
                                <td>Gym</td>
                            </tr>
                            <tr>
                                <td><input type="checkbox"/></td>
                                <td>SAS1000</td>
                                <td>Student Affairs Services 1000</td>
                                <td>X</td>
                                <td>X23</td>
                                <td>TABA, PATRICIA MAE</td>
                                <td>10-May-23</td>
                                <td>1030</td>
                                <td>1230</td>
                                <td>W</td>
                                <td>1030</td>
                                <td>1230</td>
                                <td>Room 101</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </body>

    );

}

export default CoursePage