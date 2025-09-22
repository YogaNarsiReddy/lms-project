import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import axios from 'axios';

const CertificateDownload = () => {
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

  const handleDownload = async (courseId) => {
    try {
      const response = await axios.get(`${API_URL}/certificate/${courseId}`, {
        responseType: 'blob',
        withCredentials: true,
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `certificate-${courseId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Failed to download certificate');
    }
  };

  return (
    <div className="dashboard">
      <h2>Certificates</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {enrollments.map(enrollment => (
          <li key={enrollment.id}>
            {enrollment.course.title}
            <button onClick={() => handleDownload(enrollment.course.id)}>Download Certificate</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CertificateDownload;