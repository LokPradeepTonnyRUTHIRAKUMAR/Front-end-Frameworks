import { useState } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { SAMPLE_MOVIES } from "./data/sampleMovies";
import type { Movie } from "./types";

function App() {
  const [query, setQuery] = useState("");

  const movies = SAMPLE_MOVIES as Movie[];

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1>Movie App</h1>

      <SearchBar query={query} onChange={setQuery} />

      <MovieList movies={filteredMovies} />
    </div>
  );
}

export default App;