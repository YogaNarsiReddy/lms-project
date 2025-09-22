import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from '../../config';
import axios from 'axios';

const Forum = () => {
  const { courseId } = useParams();
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ content: '', parentId: null });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [courseId]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/courses/${courseId}/forum`, { withCredentials: true });
      setPosts(response.data);
    } catch (err) {
      setError('Failed to fetch forum posts');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.content.trim()) {
      setError('Please enter content');
      return;
    }
    try {
      await axios.post(`${API_URL}/courses/${courseId}/forum`, form, { withCredentials: true });
      setForm({ content: '', parentId: null });
      fetchPosts();
    } catch (err) {
      setError('Failed to post');
    }
  };

  const handleReply = (postId) => {
    setForm({ ...form, parentId: postId });
  };

  return (
    <div className="dashboard">
      <h2>Course Forum</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          placeholder="Post a message..."
        />
        <button type="submit">Post</button>
      </form>
      <ul>
        {posts.filter(post => !post.parent).map(post => (
          <li key={post.id}>
            <strong>{post.author.username}:</strong> {post.content}
            <button onClick={() => handleReply(post.id)}>Reply</button>
            {post.replies.map(reply => (
              <div key={reply.id} style={{ marginLeft: '20px', borderLeft: '1px solid #ccc', paddingLeft: '10px' }}>
                <strong>{reply.author.username}:</strong> {reply.content}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Forum;