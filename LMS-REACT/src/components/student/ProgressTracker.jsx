import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import axios from 'axios';

const ProgressTracker = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get(`${API_URL}/student/enrollments`, { withCredentials: true });
      setEnrollments(response.data);
    } catch (err) {
      setError('Failed to fetch enrollments');
    }
  };

  return (
    <div className="dashboard">
      <h2>My Progress</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {enrollments.map(enrollment => (
          <li key={enrollment.id}>
            {enrollment.course.title}: {enrollment.progress}% Complete
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgressTracker;