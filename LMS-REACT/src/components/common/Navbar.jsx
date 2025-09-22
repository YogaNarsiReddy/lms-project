import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import {
  AccountCircle,
  AdminPanelSettings,
  School,
  Person,
} from '@mui/icons-material';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getProfileIcon = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return <AdminPanelSettings sx={{ mr: 1 }} />;
      case 'instructor':
        return <Person sx={{ mr: 1 }} />;
      case 'student':
        return <School sx={{ mr: 1 }} />;
      default:
        return <AccountCircle sx={{ mr: 1 }} />;
    }
  };

  if (!user) {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LMS
          </Typography>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
          <Button color="inherit" component={Link} to="/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

  const role = user.roles[0].name.toLowerCase();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          LMS - {user.username}
          {getProfileIcon(role)}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to={`/${role}/dashboard`}>
            Dashboard
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
          {role === 'admin' && (
            <>
              <Button color="inherit" component={Link} to="/admin/users">
                Users
              </Button>
              <Button color="inherit" component={Link} to="/admin/courses">
                Courses
              </Button>
            </>
          )}
          {role === 'instructor' && (
            <>
              <Button color="inherit" component={Link} to="/instructor/courses">
                My Courses
              </Button>
              <Button color="inherit" component={Link} to="/instructor/assignments">
                Assignments
              </Button>
              <Button color="inherit" component={Link} to="/instructor/submissions">
                Submissions
              </Button>
            </>
          )}
          {role === 'student' && (
            <>
              <Button color="inherit" component={Link} to="/student/courses">
                Courses
              </Button>
              <Button color="inherit" component={Link} to="/student/progress">
                Progress
              </Button>
              <Button color="inherit" component={Link} to="/student/certificates">
                Certificates
              </Button>
            </>
          )}
          <Button color="secondary" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;