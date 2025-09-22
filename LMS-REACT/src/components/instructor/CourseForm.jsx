import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import axios from 'axios';

const CourseForm = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ id: null, title: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/instructor/courses`, { withCredentials: true });
      setCourses(response.data);
    } catch (err) {
      setError('Failed to fetch courses');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) {
      setError('Please enter a course title');
      return;
    }
    try {
      if (form.id) {
        await axios.put(`${API_URL}/instructor/courses/${form.id}`, form, { withCredentials: true });
      } else {
        await axios.post(`${API_URL}/instructor/courses`, form, { withCredentials: true });
      }
      fetchCourses();
      setForm({ id: null, title: '' });
    } catch (err) {
      setError('Operation failed');
    }
  };

  const handleEdit = (course) => {
    setForm({ id: course.id, title: course.title });
  };

  return (
    <div className="dashboard">
      <h2>Manage Courses</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Course Title"
        />
        <button type="submit">{form.id ? 'Update' : 'Create'} Course</button>
      </form>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            {course.title}
            <button onClick={() => handleEdit(course)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseForm;