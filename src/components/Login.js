import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Avatar,
  Box,
  Tabs,
  Tab,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Login = ({ open, onClose, setUserDetails }) => {
  // State Variables
  const [tabIndex, setTabIndex] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false); // Track login status
  const [anchorEl, setAnchorEl] = useState(null); // For dropdown menu

  // Handle tab change
  const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
    setError(''); // Clear error on tab change
    resetFields(); // Reset fields on tab change
  };

  // Reset input fields
  const resetFields = () => {
    setName('');
    setEmail('');
    setPassword('');
    setError('');
  };

  // Handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate fields before submission
    if (!validateFields()) return;

    try {
      if (tabIndex === 1) {
        // Registration API call
        await axios.post('http://localhost:8080/api/movie/users/register', {
          name,
          email,
          password,
        });
        alert('Registration successful!');
        resetFields(); // Clear fields after successful registration
      } else {
        // Login API call
        const response = await axios.post('http://localhost:8080/api/movie/users/login', {
          email,
          password,
        });
        setUserDetails(response.data); // Update parent component's user details
        setLoggedIn(true); // Set login status
        onClose(); // Close the dialog after submission
      }
    } catch (error) {
      console.error('Error during login:', error);
      const message = error.response?.data?.message || 'invalid email and password.';
      setError(message); // Set error message for display
    }
  };

  // Validate input fields
  const validateFields = () => {
    if (tabIndex === 1 && !name) {
      setError('Name is required.');
      return false;
    }
    if (!email) {
      setError('Email is required.');
      return false;
    }
    if (!password) {
      setError('Password is required.');
      return false;
    }
    return true;
  };

  // Handle menu open/close
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget); // Open menu
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close menu
  };

  const handleLogout = () => {
    setLoggedIn(false); // Set logged out state
    setUserDetails(null); // Clear user details in parent component
    setAnchorEl(null); // Close menu
    alert('Logged out!');
  };

  return (
    <>
    
           

      {/* Login/Register Dialog */}
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: 'teal', mr: 1 }}>
              <AccountCircleIcon />
            </Avatar>
          Welcome - Please Login
          </Box>
        </DialogTitle>
        <DialogContent>
          <Tabs value={tabIndex} onChange={handleTabChange} centered>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
          <Box mt={2}>
            {tabIndex === 1 && (
              <TextField
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Box color="red" mt={1}>
                {error}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: 'teal' }}>
            {tabIndex === 1 ? 'Register' : 'Login'}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Login;
