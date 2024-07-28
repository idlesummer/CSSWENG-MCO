import './App.css';
import Dashboard from './Dashboard/Dashboard.js';
import LoginPage from './LoginPage/LoginPage.js';
import CoursePage from './CoursePage/CoursePage.js';
import CourseOfferings from './CourseOfferings/CourseOfferings.js';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {

  const sampleClass = [
    { id: 1,
    program: "BSCS-ST",
    batch: 122,
    taker: 20,
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
    program: "ACPYNB",
    batch: 124,
    taker: 10,
    code: "SAS", 
    title: "Sas Title", 
    offered_to: "X", 
    section: "X22",
    faculty: "I love you", 
    day1: "T", 
    begin1: "1800", 
    end1: "2000", 
    room1: "Sa bahay ko", 
    day2: "F",
    begin2: "1300",
    end2: "1500", 
    room2: "Mwah", 
    enrl_cap: "40",
    remarks: "Remark Sample 20",
  }    
];

  const sampleTakers = [
    {
      id: 1,
      code: "IET-ADS-122",
      takers: 8
    },
    {
      id: 2,
      code: "IET-GDS-123",
      takers: 10
    }
  ];

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/coursepage" element={<CoursePage courseList={sampleClass} />} />
          <Route path="/offerings" element={<CourseOfferings courseList={sampleClass} takersList={sampleTakers}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
