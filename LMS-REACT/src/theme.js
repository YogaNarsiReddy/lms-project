import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue for primary actions
    },
    secondary: {
      main: '#ff4444', // Red for logout and alerts
    },
    background: {
      default: '#f4f4f4', // Light gray background
      paper: '#ffffff', // White for cards and modals
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
      marginBottom: '1rem',
    },
    button: {
      textTransform: 'none', // Remove uppercase for buttons
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          transition: 'transform 0.2s ease-in-out, background-color 0.3s',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: '#1565c0', // Darker blue on hover
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#333',
          padding: '10px 20px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.3s ease-in-out',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          },
        },
      },
    },
  },
});

export default theme;