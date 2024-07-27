import './App.css';
import Dashboard from './Dashboard/Dashboard.js';
import LoginPage from './LoginPage/LoginPage.js';
import CoursePage from './CoursePage/CoursePage.js';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


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
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/coursepage">
          <CoursePage />
        </Route>
        <Route exact path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
