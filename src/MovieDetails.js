// src/components/MovieDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MovieDetailsPage.css';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/movie/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/movie/${id}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchMovieDetails();
    fetchReviews();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="movie-details-page">
      <img src={movie.poster_url} alt={movie.title} className="movie-poster" />
      <h1>{movie.title}</h1>
      <p><strong>Genres:</strong> {movie.genres && movie.genres.join(', ')}</p>
      <p><strong>Release Date:</strong> {movie.release_date}</p>
      <p><strong>Popular:</strong> {movie.is_popular ? 'Yes' : 'No'}</p>
      <p><strong>Overview:</strong> {movie.overview}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Vote Count:</strong> {movie.vote_count}</p>
      
      <h2>Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review">
            <strong>{review.author}</strong>: {review.comment}
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};

export default MovieDetailsPage;
