import React, { useState, useEffect } from 'react';
import { API_URL } from '../../config';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id: null, username: '', email: '', password: '', role: 'STUDENT' });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/users`, { withCredentials: true });
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      setError('Please fill all fields');
      return;
    }
    try {
      if (form.id) {
        await axios.put(`${API_URL}/admin/users/${form.id}`, {
          ...form,
          roles: [{ name: form.role }],
        }, { withCredentials: true });
      } else {
        await axios.post(`${API_URL}/admin/users`, {
          ...form,
          roles: [{ name: form.role }],
        }, { withCredentials: true });
      }
      fetchUsers();
      setForm({ id: null, username: '', email: '', password: '', role: 'STUDENT' });
    } catch (err) {
      setError('Operation failed');
    }
  };

  const handleEdit = (user) => {
    setForm({ id: user.id, username: user.username, email: user.email, password: '', role: user.roles[0].name });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/admin/users/${id}`, { withCredentials: true });
      fetchUsers();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="dashboard">
      <h2>User Management</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="Username"
        />
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
        />
        <input
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          type="password"
        />
        <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          <option value="ADMIN">Admin</option>
          <option value="INSTRUCTOR">Instructor</option>
          <option value="STUDENT">Student</option>
        </select>
        <button type="submit">{form.id ? 'Update' : 'Create'} User</button>
      </form>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.email}) - {user.roles[0].name}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;