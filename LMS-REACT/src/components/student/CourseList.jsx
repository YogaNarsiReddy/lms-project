import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/courses`, { withCredentials: true });
      setCourses(response.data);
    } catch (err) {
      setError('Failed to fetch courses');
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await axios.post(`${API_URL}/student/enroll/${courseId}`, {}, { withCredentials: true });
      alert('Enrolled successfully');
    } catch (err) {
      setError('Failed to enroll');
    }
  };

  return (
    <div className="dashboard">
      <h2>Available Courses</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {course.title} (Instructor: {course.instructor.username})
            <button onClick={() => handleEnroll(course.id)}>Enroll</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;