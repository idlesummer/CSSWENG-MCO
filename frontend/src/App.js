import './App.css';
import Dashboard from './Dashboard/Dashboard.js';
import LoginPage from './LoginPage/LoginPage.js';
import CoursePage from './CoursePage/CoursePage.js';
import CourseOfferings from './CourseOfferings/CourseOfferings.js';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/coursepage" element={<CoursePage />} />
          <Route path="/offerings" element={<CourseOfferings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
