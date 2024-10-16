import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY; // Access the API key from the environment variable
const BASE_URL = "https://api.themoviedb.org/3";

// Function to get popular movies
export const getPopularMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );
  return response.data.results;
};

// Function to search movies by query
export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return response.data.results;
};

// Function to get movie details
export const getMovieDetails = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}`
  );
  return response.data;
};

// Function to get movie credits (cast and crew)
export const getMovieCredits = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`
  );
  return response.data;
};

// Function to get movie trailer
export const getMovieTrailer = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
  );
  const trailer = response.data.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
  return trailer ? trailer.key : null;
};
