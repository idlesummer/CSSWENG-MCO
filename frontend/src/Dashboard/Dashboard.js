import Sidebar from '../Sidebar/Sidebar.js'
import styles from './Dashboard.module.css'

import { useEffect, useState } from 'react'

// const items = [
//     { id: '124', 
//       label: 'ID124', 
//       list: ['BS Interactive Entertainment major in Game Design', 
//              'BS Interactive Entertainment major in Game Development', 
//              'BS Information Systems', 
//              'BS Computer Science major in Software Technology'], 
//       code: ['BSIET-AD',
//              'BSIET-GD',
//              'BSIS',
//              'BSCS-ST'] },
//     { id: '123',
//       label: 'ID123',
//       list: ['BS Interactive Entertainment major in Game Design',
//              'BS Interactive Entertainment major in Game Development',
//              'BS Information Systems', 
//              'BS Computer Science major in Software Technology'],
//       code: ['BSIET-AD',
//              'BSIET-GD',
//              'BSIS',
//              'BSCS-ST'] }
// ];

function Dashboard() {
  const [batchLists, setBatchLists] = useState({});

  useEffect(() => {
    const fetchHome = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api`);
      const data = await res.json();
      setBatchLists(data);
    };

    fetchHome();
  }, []);

  const initialDropdownState = items.reduce((acc, item) => {
    acc[item.id] = false;
    return acc;
  }, {});

  const [isDropdownOpen, setIsDropdownOpen] = useState(initialDropdownState);

  const toggleDropdown = (id) => {
    setIsDropdownOpen(prevState => ({...prevState, [id]: !prevState[id]}));
  };

  const getProgramInfo = (divId, programName, programCode) => {
    const program = { divId, programName, programCode };
    console.log(program);
  }

  const programList = items.map(item => (
    <div className={styles.item} key={item.id}>
      <div className={styles.itemHeader} onClick={() => toggleDropdown(item.id)}>
        <div className={styles.dropdownIcon}><img src='/img/icons/dropdown.png' alt="dropdown icon"/></div>
        <div>{item.label}</div>
      </div>
      
      {isDropdownOpen[item.id] && (
        <ul className={`${styles.itemList} ${isDropdownOpen[item.id] ? styles.open : ''}`}>
          {
            item.list.map((programName, index) => {
              const programCode = item.code[index];
              const divId = item.id;
              return (
                <li key={programCode} onClick={() => getProgramInfo(divId, programName, programCode)}>{programName}</li>
              );
            })
          }
        </ul>
      )}
    </div>
  ));
    
  return (
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

export default Dashboard;
