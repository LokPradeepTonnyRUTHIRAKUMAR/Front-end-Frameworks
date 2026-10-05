import { useState } from "react";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import { useMovies } from "../hooks/useMovies";

function HomePage() {
  const [query, setQuery] = useState("");

  const { movies, loading, error } = useMovies({
    search: query,
  });

  return (
    <main>
      <h1>Movie App</h1>

      <SearchBar query={query} onChange={setQuery} />

      {loading && <p>Loading movies...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && <MovieList movies={movies} />}
    </main>
  );
}

export default HomePage;
