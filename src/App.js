// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import ButtonAppBar from './components/AppBar';
import Sidebar from './components/Sidebar';
import MovieGrid from './components/MovieCard'; 
import Login from './components/Login';

const App = () => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [viewType, setViewType] = useState('popular'); // Default to 'popular'
  const [userDetails, setUserDetails] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]); 

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); 
  };

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`http://localhost:8080/api/movie/search/${query}`);
      if (response.ok) {
        const movies = await response.json();
        setSearchResults(movies); // Update search results state
      } else {
        console.error("Error fetching movies:", response.status);
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const handleGenreClick = (genre) => {
    setSelectedGenre(genre); // Set the selected genre
    setViewType(null); // Clear the view type to ensure we fetch genre-specific movies
    setSearchResults([]); // Clear search results when a genre is selected
    toggleSidebar(); // Close sidebar after genre selection
  };

  const handleViewTypeClick = (type) => {
    setViewType(type); // Set the view type to the clicked type
    setSelectedGenre(null); // Clear selected genre
    setSearchResults([]); // Clear search results when a view type is selected
    toggleSidebar(); // Close sidebar after selection
  };

  const handleLogout = () => {
    setUserDetails(null); // Reset user details
  };

  return (
    <Router>
      <CssBaseline />
      <ButtonAppBar 
        toggleSidebar={toggleSidebar} 
        onLoginClick={handleLoginClick} 
        onSearch={handleSearch} 
        userDetails={userDetails} // Pass user details to AppBar
        onLogout={handleLogout} // Pass logout function to AppBar
      />
      <Sidebar 
        setSelectedGenre={handleGenreClick} 
        toggleSidebar={toggleSidebar}
        isOpen={isSidebarOpen} // Pass sidebar state to Sidebar component
        onViewTypeClick={handleViewTypeClick} // New prop for view type clicks
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <MovieGrid 
          selectedGenre={selectedGenre} 
          viewType={viewType} 
          searchResults={searchResults} 
        />
      </Box>
      <Login open={isLoginOpen} onClose={handleLoginClose} setUserDetails={setUserDetails} />
      {userDetails && (
        <div style={{ position: 'absolute', top: 10, right: 10, color: 'white' }}>
          {`Welcome, ${userDetails.name}`}
        </div>
      )}
    </Router>
  );
};

export default App;
