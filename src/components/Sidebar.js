import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import { 
  Movie as MovieIcon,      // For Popular
  AccessTime as AccessTimeIcon, // For Upcoming
  Star as StarIcon,        // For Top Rated
  LocalMovies as ActionIcon, // For Action
  Animation as AnimationIcon, // For Animation (You can choose any suitable icon)
  Favorite as FavoriteIcon, // For Romance
  Mood as ComedyIcon,      // For Comedy
  Security as CrimeIcon, // Updated icon for Crime
  Theaters as ThrillerIcon, // For Thriller
  Science as SciFiIcon,     // For Sci-Fi
  EmojiEvents as DramaIcon, // For Drama
  SentimentDissatisfied as HorrorIcon // For Horror
} from '@mui/icons-material'; // Import icons from Material-UI

const Sidebar = ({ setSelectedGenre, toggleSidebar, isOpen, onViewTypeClick }) => {
  const genres = [
    { name: 'Popular', icon: <MovieIcon /> },
    { name: 'Upcoming', icon: <AccessTimeIcon /> },
    { name: 'Top Rated', icon: <StarIcon /> },
    { name: 'Action', icon: <ActionIcon /> },
    { name: 'Animation', icon: <AnimationIcon /> },
    { name: 'Romance', icon: <FavoriteIcon /> },
    { name: 'Comedy', icon: <ComedyIcon /> },
    { name: 'Crime', icon: <CrimeIcon /> }, // Updated icon for Crime
    { name: 'Thriller', icon: <ThrillerIcon /> },
    { name: 'Sci-Fi', icon: <SciFiIcon /> },
    { name: 'Drama', icon: <DramaIcon /> },
    { name: 'Horror', icon: <HorrorIcon /> },
  ];

  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={isOpen} // Use the prop to control open state
      onClose={toggleSidebar} // Close on backdrop click
      sx={{
        '& .MuiDrawer-paper': {
          width: '240px', // Set width of sidebar
          backgroundColor: '#D3D3D3', // Background color
          transition: 'transform 0.3s ease-in-out', // Animation for opening/closing
        },
      }}
    >
      <List>
        <h2 style={{ textAlign: 'center' }}>Genres</h2> {/* Align heading to center */}
        {genres.map(({ name, icon }) => (
          <ListItem 
            button 
            key={name} 
            onClick={() => {
              if (['Popular', 'Upcoming', 'Top Rated'].includes(name)) {
                onViewTypeClick(name.toLowerCase().replace(' ', '-')); // Handle view type
              } else {
                setSelectedGenre(name); // Handle genre selection
              }
              toggleSidebar(); // Close sidebar after selection
            }}
            sx={{
              display: 'flex', // Flex layout for icon and text
              alignItems: 'center', // Center align items
              '&:hover': {
                backgroundColor: '#B0C4DE', // Change background color on hover
                transition: 'background-color 0.3s ease', // Animation for hover
              },
            }}
          >
            {icon} {/* Render the icon */}
            <ListItemText primary={name} sx={{ color: 'Black', marginLeft: '10px' }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
