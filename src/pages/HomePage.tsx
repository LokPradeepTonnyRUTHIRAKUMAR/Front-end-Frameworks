
import { useState } from "react";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import { useMovies } from "../hooks/useMovies";

function HomePage() {
  const [query, setQuery] = useState("");

  const { movies, loading, error } = useMovies({
    search: query,
  });

  const hasQuery = query.trim().length > 0;

  // Do not show movies while loading or after an error.
  const visibleMovies = loading || error ? [] : movies;

  const showResultsHeading =
    !loading && !error && (visibleMovies.length > 0 || !hasQuery);

  return (
    <main className="home-page">
      <section className="hero-section">
        <p className="eyebrow">YOUR NEXT MOVIE NIGHT STARTS HERE</p>

        <h1>
          Discover your next
          <span className="hero-highlight"> favourite movie.</span>
        </h1>

        <p className="hero-description">
          Explore movies, discover hidden gems, and save your favourites
          in one place.
        </p>

        <div className="search-wrapper">
          <SearchBar query={query} onChange={setQuery} />
        </div>
      </section>

      <section className="movies-section">
        {showResultsHeading && (
          <div className="section-heading">
            <div>
              <h2>{hasQuery ? "Search Results" : "Explore Movies"}</h2>
              <p>
                {hasQuery
                  ? `Movies matching "${query}"`
                  : "Find something great to watch today."}
              </p>
            </div>
          </div>
        )}

        {loading && (
          <p className="status-message">Loading movies...</p>
        )}

        {error && (
          <p className="error-message">{error}</p>
        )}

        {!loading && !error && visibleMovies.length > 0 && (
          <MovieList movies={visibleMovies} />
        )}

        {!loading && !error && hasQuery && visibleMovies.length === 0 && (
          <p className="status-message">
            No movies found. Try another search.
          </p>
        )}
      </section>
    </main>
  );
}

export default HomePage;
