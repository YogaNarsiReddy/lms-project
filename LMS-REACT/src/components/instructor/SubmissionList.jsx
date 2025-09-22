import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../config';
import axios from 'axios';

const SubmissionList = () => {
  const { courseId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState('');
  const [grade, setGrade] = useState('');
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

  const fetchSubmissions = async (assignmentId) => {
    try {
      const response = await axios.get(`${API_URL}/instructor/submissions/${assignmentId}`, { withCredentials: true });
      setSubmissions(response.data);
    } catch (err) {
      setError('Failed to fetch submissions');
    }
  };

  const handleGrade = async (submissionId) => {
    if (!grade || isNaN(grade) || grade < 0 || grade > 100) {
      setError('Please enter a valid grade (0-100)');
      return;
    }
    try {
      await axios.put(`${API_URL}/instructor/submissions/${submissionId}`, { grade }, { withCredentials: true });
      fetchSubmissions(selectedAssignment);
      setGrade('');
    } catch (err) {
      setError('Failed to grade submission');
    }
  };

  return (
    <div className="dashboard">
      <h2>Submissions</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select onChange={(e) => {
        setSelectedAssignment(e.target.value);
        if (e.target.value) fetchSubmissions(e.target.value);
      }}>
        <option value="">Select Assignment</option>
        {assignments.map(assignment => (
          <option key={assignment.id} value={assignment.id}>{assignment.title}</option>
        ))}
      </select>
      <ul>
        {submissions.map(submission => (
          <li key={submission.id}>
            {submission.student.username}: {submission.content} (Grade: {submission.grade || 'Ungraded'})
            <input
              type="number"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="Enter grade"
            />
            <button onClick={() => handleGrade(submission.id)}>Grade</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmissionList;