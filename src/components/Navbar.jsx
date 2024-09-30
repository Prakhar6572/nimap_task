import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Global.css';

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_KEY ='c45a857c193f6302f2b5061c3b85e743'; // Use environment variable

  const handleSearch = async (debouncedQuery) => {
    if (debouncedQuery.trim()) {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${debouncedQuery}&page=1`
        );
        const data = await response.json();
        setSearchResults(data.results);
        navigate(`/search/${debouncedQuery}`, { state: { searchResults: data.results } });
      } catch (error) {
        setError('Error fetching movie data. Please try again.');
      }
    }
  };

  const debouncedSearch = () => {
    const timeoutId = setTimeout(() => {
      handleSearch(query);
    }, 500); // Debounce by 500ms

    return () => {
      clearTimeout(timeoutId);
    };
  };

  useEffect(() => {
    debouncedSearch();
  }, [query]);

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/top-rated">Top Rated</Link>
        </li>
        <li>
          <Link to="/upcoming">Upcoming</Link>
        </li>
      </ul>

      <div className="navbar-search">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button onClick={() => handleSearch(query)}>Search</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </nav>
  );
};

export default Navbar;