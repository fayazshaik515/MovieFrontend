// src/components/AvatarMenu.js
import React from 'react';
import { Avatar, Menu, MenuItem, Typography, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AvatarMenu = ({ userDetails, onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Avatar onClick={handleMenuOpen} sx={{ bgcolor: 'teal', cursor: 'pointer' }}>
        <AccountCircleIcon sx={{ color: 'white' }} /> {/* Change icon color to white for contrast */}
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <Typography variant="h6">{userDetails.name}</Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body2">{userDetails.email}</Typography>
        </MenuItem>
        <MenuItem onClick={onLogout}>Sign Out</MenuItem>
      </Menu>
    </Box>
  );
};

export default AvatarMenu;
