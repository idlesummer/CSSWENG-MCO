import './App.css';
// import Dashboard from './Dashboard/Dashboard.js'
import LoginPage from './LoginPage/LoginPage.js'
import CoursePage from './CoursePage/CoursePage.js'



function App() {

  const sampleClass = [
    { id: 1,
    code: "GEFTWEL", 
    title: "Physical Fitness and Wellness", 
    offered_to: "X", 
    section: "X22",
    faculty: "TUMALE, MARIA CRISTINA", 
    day1: "T", 
    begin1: "1300", 
    end1: "1500", 
    room1: "Gym", 
    day2: "F",
    begin2: "1300",
    end2: "1500", 
    room2: "Gym", 
    enrl_cap: "40",
    remarks: "Remark Sample",
  },
  { id: 2,
    code: "SAS", 
    title: "Sas Title", 
    offered_to: "X", 
    section: "X22",
    faculty: "TUMALE, MARIA CRISTINA", 
    day1: "T", 
    begin1: "1300", 
    end1: "1500", 
    room1: "Gym", 
    day2: "F",
    begin2: "1300",
    end2: "1500", 
    room2: "Gym", 
    enrl_cap: "40",
    remarks: "Remark Sample",
  }    
];

  return (
    <CoursePage courseList={sampleClass} />
  );
}

export default App;
