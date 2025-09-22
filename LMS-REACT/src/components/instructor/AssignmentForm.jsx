import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import axios from 'axios';

const AssignmentForm = () => {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ title: '', dueDate: '', courseId: '' });
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
    if (!form.title || !form.dueDate || !form.courseId) {
      setError('Please fill all fields');
      return;
    }
    try {
      await axios.post(`${API_URL}/instructor/assignments`, {
        title: form.title,
        dueDate: form.dueDate,
        course: { id: form.courseId },
      }, { withCredentials: true });
      setForm({ title: '', dueDate: '', courseId: '' });
    } catch (err) {
      setError('Failed to create assignment');
    }
  };

  return (
    <div className="dashboard">
      <h2>Create Assignment</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Assignment Title"
        />
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
        />
        <select
          value={form.courseId}
          onChange={(e) => setForm({ ...form, courseId: e.target.value })}
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
        <button type="submit">Create Assignment</button>
      </form>
    </div>
  );
};

export default AssignmentForm;