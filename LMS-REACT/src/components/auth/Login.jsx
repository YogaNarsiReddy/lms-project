import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { API_URL } from '../../config';
import axios from 'axios';
import { Box, Card, CardContent, TextField, Button, Typography, Fade } from '@mui/material';
import { Login as LoginIcon } from '@mui/icons-material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill all fields');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { username, password }, { withCredentials: true });
      login(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate(`/${response.data.roles[0].name.toLowerCase()}/dashboard`);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Fade in={true} timeout={500}>
      <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              <LoginIcon fontSize="large" color="primary" />
              <Typography variant="h2">Login</Typography>
            </Box>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Fade>
  );
};

export default Login;