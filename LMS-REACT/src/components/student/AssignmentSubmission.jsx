import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../config';
import axios from 'axios';

const AssignmentSubmission = () => {
  const { courseId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({ assignmentId: '', content: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAssignments();
  }, [courseId]);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(`${API_URL}/instructor/assignments/${courseId}`, { withCredentials: true });
      setAssignments(response.data);
    } catch (err) {
      setError('Failed to fetch assignments');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.assignmentId || !form.content) {
      setError('Please select an assignment and enter content');
      return;
    }
    try {
      await axios.post(`${API_URL}/student/submissions`, {
        assignment: { id: form.assignmentId },
        content: form.content,
      }, { withCredentials: true });
      setForm({ assignmentId: '', content: '' });
      alert('Submission successful');
    } catch (err) {
      setError('Failed to submit assignment');
    }
  };

  return (
    <div className="dashboard">
      <h2>Submit Assignment</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <select
          value={form.assignmentId}
          onChange={(e) => setForm({ ...form, assignmentId: e.target.value })}
        >
          <option value="">Select Assignment</option>
          {assignments.map(assignment => (
            <option key={assignment.id} value={assignment.id}>{assignment.title}</option>
          ))}
        </select>
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Submission Content"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AssignmentSubmission;