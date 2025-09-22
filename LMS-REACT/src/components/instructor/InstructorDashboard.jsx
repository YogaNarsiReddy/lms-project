import React from 'react';
import { Link } from 'react-router-dom';

const InstructorDashboard = () => {
  return (
    <div className="dashboard">
      <h2>Instructor Dashboard</h2>
      <p>Manage your courses and assignments.</p>
      <Link to="/instructor/courses">Manage Courses</Link> | <Link to="/instructor/assignments">Manage Assignments</Link>
    </div>
  );
};

export default InstructorDashboard;