import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, getMovieCredits, getMovieTrailer } from './api/movieApi';
import './MovieDetailsPage.css'; // Custom CSS for details page

const MovieDetailsPage = () => {
  const { id } = useParams(); // Get movie ID from the URL
  const [movie, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState('');
  // Add loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [movieDetails, movieCredits, movieTrailer] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieTrailer(id)
        ]);

        setMovie(movieDetails);
        setCast(movieCredits.cast.slice(0, 10)); // Display top 10 cast members
        setTrailer(movieTrailer); // Set YouTube trailer URL
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to fetch movie details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  // Add loading and error handling
  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="movie-details-container">
      <div className="movie-content">
        <div className="movie-header">
          {movie.poster_path && (
            <img 
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
              alt={movie.title} 
              className="movie-poster-large" 
            />
          )}
          <div className="movie-info">
            <h1>{movie.title}</h1>
            {movie.vote_average && (
              <p><strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10</p>
            )}
            <p>{movie.overview}</p>
          </div>
        </div>

        <h2>Watch Trailer</h2>
        {trailer ? (
          <div className="trailer-container">
            <iframe
              className="trailer-video"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p>No trailer available.</p>
        )}

        <h2>Cast</h2>
        <div className="cast-grid">
          {cast.map((actor) => (
            <div key={actor.id} className="cast-member">
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                  alt={actor.name}
                  className="cast-photo"
                />
              )}
              <p>{actor.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
