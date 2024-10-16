import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPopularMovies, searchMovies } from './api/movieApi';

import './HomePage.css'; // Import custom CSS file

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    };

    fetchMovies();
  }, []);

  // Search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      const searchedMovies = await searchMovies(searchTerm);
      setMovies(searchedMovies);
    }
  };

  return (
    <div className="container">
      {/* Hero Section with Search Bar */}
      <div className="hero-section">
        <h1>Find Your Favorite Movies</h1>
        <p>Search through a vast collection of popular and recommended movies!</p>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>

      {/* Popular Movies Section */}
      <h2 className="section-title">Popular Movies</h2>

      {/* Horizontal scrolling movies row */}
      <div className="movie-row">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              className="movie-poster"
              alt={movie.title}
            />
            <div className="movie-info">
              <h5 className="movie-title">{movie.title}</h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
