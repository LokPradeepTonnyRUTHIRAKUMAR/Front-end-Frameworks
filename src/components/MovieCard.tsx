import { useState } from "react";
import type { Movie } from "../types";
import { getPosterUrl } from "../data/sampleMovies";

type MovieCardProps = {
  movie: Movie;
};

function MovieCard({ movie }: MovieCardProps) {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <article>
      <img
        src={getPosterUrl(movie.poster_path)}
        alt={movie.title}
      />

      <h2>{movie.title}</h2>

      <p>Rating: {movie.vote_average.toFixed(1)}</p>

      <button onClick={() => setIsFavourite(!isFavourite)}>
        {isFavourite
          ? "Remove from favourites"
          : "Add to favourites"}
      </button>
    </article>
  );
}

export default MovieCard;