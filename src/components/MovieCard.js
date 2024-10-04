// src/components/MovieGrid.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieDetails from '../MovieDetails';
import './MovieGrid.css'; // Import the CSS file
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const MovieGrid = ({ selectedGenre, viewType, searchResults }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      let response;
      if (searchResults && searchResults.length > 0) {
        setMovies(searchResults); // If there are search results, set them as movies
      } else {
        // Otherwise, fetch movies based on genre or view type
        try {
          if (viewType === 'top-rated') {
            response = await axios.get('http://localhost:8080/api/movie/toprated');
          } else if (viewType === 'popular') {
            response = await axios.get('http://localhost:8080/api/movie/popular');
          } else if (viewType === 'upcoming') {
            response = await axios.get('http://localhost:8080/api/movie/upcoming');
          } else if (selectedGenre) {
            response = await axios.get(`http://localhost:8080/api/movie/genre/${selectedGenre}`);
          }
          setMovies(response.data); // Set the fetched movies
        } catch (error) {
          console.error('Error fetching movies:', error);
        }
      }
    };

    fetchMovies();
  }, [selectedGenre, viewType, searchResults]); // Include selectedGenre and searchResults in the dependency array

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const getColor = (rating) => {
    if (rating >= 70) return '#21d07a'; // Green
    if (rating >= 40) return '#f5c518'; // Yellow
    return '#db2360'; // Red
  };

  return (
    <main className="movie-grid-container">
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} handleClose={handleCloseDetails} />
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id} onClick={() => handleMovieClick(movie)}>
              <img src={movie.posterUrl} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>{movie.releaseDate}</p>
             
              <div className="rating-circle">
                {movie.rating !== null ? (
                  <CircularProgressbar
                    value={movie.rating * 10}
                    text={`${movie.rating * 10}%`}
                    styles={buildStyles({
                      textSize: '26px',
                      pathColor: getColor(movie.rating * 10),
                      textColor: getColor(movie.rating * 10),
                      trailColor: '#d6d6d6',
                    })}
                  />
                ) : (
                  <p>No Rating</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MovieGrid;

