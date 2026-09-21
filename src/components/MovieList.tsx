import MovieCard from "./MovieCard";
import type { Movie } from "../types";

type MovieListProps = {
  movies: Movie[];
};

function MovieList({ movies }: MovieListProps) {
  if (movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default MovieList;