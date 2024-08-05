import './App.css';
import Dashboard from './pages/Dashboard/Dashboard.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import CoursePage from './pages/CoursePage/CoursePage.js';
import CourseOfferings from './pages/CourseOfferings/CourseOfferings.js';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/coursepage" element={<CoursePage />} />
          <Route path="/course-offerings" element={<CourseOfferings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
