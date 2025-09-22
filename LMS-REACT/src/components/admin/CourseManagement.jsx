import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import axios from 'axios';

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ id: null, title: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/courses`, { withCredentials: true });
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
        await axios.put(`${API_URL}/admin/courses/${form.id}`, form, { withCredentials: true });
      } else {
        await axios.post(`${API_URL}/admin/courses`, form, { withCredentials: true });
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/admin/courses/${id}`, { withCredentials: true });
      fetchCourses();
    } catch (err) {
      setError('Failed to delete course');
    }
  };

  return (
    <div className="dashboard">
      <h2>Course Management</h2>
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
            <button onClick={() => handleDelete(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseManagement;