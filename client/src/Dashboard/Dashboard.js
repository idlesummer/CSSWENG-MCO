import Sidebar from '../Sidebar/Sidebar.js'
import styles from './Dashboard.module.css'

import { useState } from 'react'

// temporary dummy database entries
const items = [
    { id: 'id124', label: 'ID124', list: ['BS Interactive Entertainment major in Game Design', 'BS Interactive Entertainment major in Game Development', 'BS Information Systems', 'BS Computer Science major in Software Technology'] },
    { id: 'id123', label: 'ID123', list: ['BS Interactive Entertainment major in Game Design', 'BS Interactive Entertainment major in Game Development', 'BS Information Systems', 'BS Computer Science major in Software Technology'] }
];

function Dashboard() {

    const initialDropdownState = items.reduce((acc, item) => {
        acc[item.id] = false;
        return acc;
    }, {});

    const [isDropdownOpen, setIsDropdownOpen] = useState(initialDropdownState);

    const toggleDropdown = (id) => {
        setIsDropdownOpen(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const programList = items.map(item => (
        <div className={styles.item} key={item.id}>
            <div className={styles.itemHeader} onClick={() => toggleDropdown(item.id)}>
                <div className={styles.dropdownIcon}><img src='/img/icons/dropdown.png' alt="dropdown icon"/></div>
                <div>{item.label}</div>
            </div>
            {isDropdownOpen[item.id] && (
                 <ul className={`${styles.itemList} ${isDropdownOpen[item.id] ? styles.open : ''}`}>
                    {item.list.map((programName, index) => (
                        <li key={index}>{programName}</li>
                    ))}
                </ul>
            )}
        </div>
    ))

    
    return(

        <div className={styles.container}>
            <Sidebar/>
            <div className={styles.content}>
                <div className={styles.head}>
                    <p> CCS </p>
                </div>
                {programList}
            </div>
        </div>

    );

}

export default Dashboard 