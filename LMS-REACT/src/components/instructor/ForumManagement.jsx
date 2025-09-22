import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../config';
import axios from 'axios';

const ForumManagement = () => {
  const { courseId } = useParams();
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [courseId]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/courses/${courseId}/forum`, { withCredentials: true });
      setPosts(response.data);
    } catch (err) {
      setError('Failed to fetch posts');
    }
  };

  return (
    <div className="dashboard">
      <h2>Forum Management</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            {post.author.username}: {post.content}
            {post.replies.map(reply => (
              <div key={reply.id} style={{ marginLeft: '20px' }}>
                {reply.author.username}: {reply.content}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForumManagement;