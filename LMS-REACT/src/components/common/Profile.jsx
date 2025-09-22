import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { API_URL } from '../../config';
import axios from 'axios';
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Modal,
  Fade,
  IconButton,
} from '@mui/material';
import {
  AccountCircle,
  AdminPanelSettings,
  School,
  Person,
} from '@mui/icons-material';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ email: user?.email || '', password: '' });
  const [error, setError] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = { ...form };
      if (!form.password) delete updateData.password;
      const response = await axios.put(`${API_URL}/profile`, updateData, { withCredentials: true });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenModal(true); // Open modal on successful update
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const getProfileIcon = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return <AdminPanelSettings fontSize="large" sx={{ mb: 2, color: 'primary.main' }} />;
      case 'instructor':
        return <Person fontSize="large" sx={{ mb: 2, color: 'primary.main' }} />;
      case 'student':
        return <School fontSize="large" sx={{ mb: 2, color: 'primary.main' }} />;
      default:
        return <AccountCircle fontSize="large" sx={{ mb: 2, color: 'primary.main' }} />;
    }
  };

  if (!user) return <Typography>Please log in</Typography>;

  return (
    <Fade in={true} timeout={500}>
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Card>
          <CardContent>
            <Box sx={{ textAlign: 'center' }}>
              {getProfileIcon(user.roles[0].name)}
              <Typography variant="h2">Profile</Typography>
            </Box>
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="New Password (optional)"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                margin="normal"
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Update Profile
              </Button>
            </form>
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography>Username: {user.username}</Typography>
              <Typography>Role: {user.roles[0].name}</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Modal for Profile Update Confirmation */}
        <Modal open={openModal} onClose={handleCloseModal}>
          <Fade in={openModal}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                maxWidth: 400,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Profile Updated Successfully
              </Typography>
              {getProfileIcon(user.roles[0].name)}
              <Typography>Username: {user.username}</Typography>
              <Typography>Email: {user.email}</Typography>
              <Typography>Role: {user.roles[0].name}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseModal}
                sx={{ mt: 2 }}
              >
                Close
              </Button>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </Fade>
  );
};

export default Profile;