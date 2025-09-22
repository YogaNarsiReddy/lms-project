import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin! Manage users and courses below.</p>
      <Link to="/admin/users">Manage Users</Link> | <Link to="/admin/courses">Manage Courses</Link>
    </div>
  );
};

export default AdminDashboard;