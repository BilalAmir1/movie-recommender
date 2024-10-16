import { useState } from 'react';
import { searchMovies } from './api/movieApi';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query) {
      const results = await searchMovies(query);
      setMovies(results);
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for a movie..." />
        <button type="submit">Search</button>
      </form>
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
