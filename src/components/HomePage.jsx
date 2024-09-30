import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Global.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${'c45a857c193f6302f2b5061c3b85e743'}&language=en-US&page=${currentPage}`
      );
      setMovies(response.data.results);
    };

    fetchMovies();
  }, [currentPage]);

  const handleMovieClick = async (movieId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${'c45a857c193f6302f2b5061c3b85e743'}&language=en-US`
    );
    setSelectedMovie(response.data);
  };
  console.log(selectedMovie)
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container">
      <h1>Popular Movies</h1>
      <div className="movies-grid">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="movie-item"
            onClick={() => handleMovieClick(movie.id)}
            style={{cursor:"pointer"}}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button onClick={handleNextPage}>Next</button>
      </div>

      {selectedMovie && (
        <div className="movie-details">
          <h2>{selectedMovie.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
            alt={selectedMovie.title}
          />
          <p>Rating: {selectedMovie.vote_average}</p>
          <p>Overview: {selectedMovie.overview}</p>

          <h3>Cast</h3>
          {/* <div className="cast-grid">
            {selectedMovie.credits.cast.slice(0, 6).map((castMember) => (
              <div key={castMember.id} className="cast-item">
                <img
                  src={`https://image.tmdb.org/t/p/w500${castMember.profile_path}`}
                  alt={castMember.name}
                />
                <p>{castMember.name}</p>
              </div>
            ))}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default HomePage;