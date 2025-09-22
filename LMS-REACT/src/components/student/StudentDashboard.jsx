import React from 'react';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  return (
    <div className="dashboard">
      <h2>Student Dashboard</h2>
      <p>Enroll in courses and track your progress.</p>
      <Link to="/student/courses">Browse Courses</Link> | <Link to="/student/enrollments">My Enrollments</Link>
    </div>
  );
};

export default StudentDashboard;