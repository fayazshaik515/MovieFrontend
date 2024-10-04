import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import AvatarMenu from './AvatarMenu'; // Import your Avatar menu component

const ButtonAppBar = ({ toggleSidebar, onLoginClick, onSearch, userDetails, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false); // State to track hover

  const handleSearch = async (event) => {
    event.preventDefault();
    console.log("Search query:", searchQuery);
    if (onSearch) {
      onSearch(searchQuery); // This should be a function that handles the search
    }
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#232f3e' }}>
      <Toolbar>
        <Button color="inherit" onClick={toggleSidebar} edge="start">
          <MenuIcon />
        </Button>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontFamily: 'Tahoma',
            fontWeight: 'bold',
            transition: 'color 0.3s ease', // Smooth transition for color
            cursor: 'pointer' // Change cursor to pointer
          }}
          onMouseEnter={() => setIsHovered(true)} // Set hover state to true
          onMouseLeave={() => setIsHovered(false)} // Reset hover state to false
        >
          Cinemaify
        </Typography>
        <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
          <TextField
            variant="outlined"
            placeholder="Search Movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ bgcolor: 'white', borderRadius: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </form>
        {userDetails ? ( // Conditional rendering based on userDetails
          <AvatarMenu userDetails={userDetails} onLogout={onLogout} />
        ) : (
          <Button color="inherit" onClick={onLoginClick}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ButtonAppBar;
