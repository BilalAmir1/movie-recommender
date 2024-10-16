import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './Navbar'; // Navbar is in the same folder
import HomePage from './Homepage'; // HomePage is in the same folder
import SearchPage from './SearchPage'; // SearchPage is in the same folder
import MovieDetailsPage from './MovieDetailsPage'; // MovieDetailsPage is in the same folder
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const App = () => {
  return (
    <Router>
      {/* Bootstrap Navbar */}
      <AppNavbar />
      
      {/* Main Content Container */}
      <div className="container mt-4">
        <Routes>
          {/* Home Page Route */}
          <Route path="/" element={<HomePage />} />
          
          {/* Search Page Route */}
          <Route path="/search" element={<SearchPage />} />
          
          {/* Movie Details Page Route with Dynamic ID */}
          <Route path="/movie/:movieId" element={<MovieDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
