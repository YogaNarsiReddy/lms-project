import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('Please fill all fields');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return;
    }
    try {
      await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
        roles: [{ name: role }],
      }, { withCredentials: true });
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="dashboard">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="ADMIN">Admin</option>
          <option value="INSTRUCTOR">Instructor</option>
          <option value="STUDENT">Student</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;