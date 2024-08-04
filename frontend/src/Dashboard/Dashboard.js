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
  const [isPending, setIsPending] = useState(true);


  useEffect(() => {
    const fetchHome = async () => {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api`);
      const data = await res.json();
      setBatchLists(data);
      setIsPending(false);
    };

    fetchHome();
  }, []); 

  // const initialDropdownState = items.reduce((acc, item) => {
  //   acc[item.id] = false;
  //   return acc;
  // }, {});

  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const toggleDropdown = (batch) => {
    setIsDropdownOpen(prevState => ({...prevState, [batch]: !prevState[batch]}));
  };

  const getProgramInfo = async (batch, programName, programCode) => {
    // const program = { batch, programName, programCode };
    // console.log(program);

    const query = { batch, program: programCode };
    const params = new URLSearchParams(query);
    const url = `/coursepage?${params}`;

    console.log(url);
  }

  let programList = null;

  if (!isPending) {
    programList = batchLists.batches.map(batch => (
      <div className={styles.item} key={batch}>
        <div className={styles.itemHeader} onClick={() => toggleDropdown(batch)}>
          <div className={styles.dropdownIcon}><img src='/img/icons/dropdown.png' alt="dropdown icon"/></div>
          <div>{batch}</div>
        </div>
        
        {isDropdownOpen[batch] && (
          <ul className={`${styles.itemList} ${isDropdownOpen[batch] ? styles.open : ''}`}>
            {
              batchLists.batchesAndPrograms[batch].map((programNameAndCode, index) => {
                const programCode = programNameAndCode.split(' ')[0];
                const programName = programNameAndCode
                // const divId = item.id;
                return (<li key={programCode} onClick={() => getProgramInfo(batch, programName, programCode)}>{programName}</li>);
              })
            }
          </ul>
        )}
      </div>
    ));
  }

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
