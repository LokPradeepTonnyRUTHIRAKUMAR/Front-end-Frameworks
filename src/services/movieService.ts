import { SAMPLE_MOVIES, getPosterUrl } from "../data/sampleMovies";
import { getApiKey } from "../utils/storage";
import type { Movie } from "../types";

interface FetchMoviesOptions {
  search?: string;
  genre?: number;
  sort?: string;
  onlyFavorites?: boolean;
  page?: number;
}

interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  isLiveApi: boolean;
}

const API_BASE_URL = "https://api.themoviedb.org/3";

function sortMovies(movies: Movie[], sort?: string): Movie[] {
  const sorted = [...movies];

  switch (sort) {
    case "rating":
      return sorted.sort((a, b) => b.vote_average - a.vote_average);

    case "title":
      return sorted.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    case "release":
      return sorted.sort((a, b) =>
        b.release_date.localeCompare(a.release_date)
      );

    default:
      return sorted;
  }
}

function filterLocalMovies(
  movies: Movie[],
  options: FetchMoviesOptions
): Movie[] {
  let filtered = [...movies];

  if (options.search) {
    const query = options.search.toLowerCase();

    filtered = filtered.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );
  }

  if (options.genre) {
    filtered = filtered.filter((movie) =>
      movie.genre_ids?.includes(options.genre!)
    );
  }

  if (options.onlyFavorites) {
    const favorites = JSON.parse(
      localStorage.getItem("movie-app-favorites") || "[]"
    ) as number[];

    filtered = filtered.filter((movie) =>
      favorites.includes(movie.id)
    );
  }

  return sortMovies(filtered, options.sort);
}

export const movieService = {
  async fetchMovies(
    options: FetchMoviesOptions = {},
    signal?: AbortSignal
  ): Promise<MovieResponse> {
    const apiKey = getApiKey();

    // Local fallback when no API key is configured
    if (!apiKey) {
      const results = filterLocalMovies(SAMPLE_MOVIES, options);

      return {
        results,
        total_pages: 1,
        total_results: results.length,
        isLiveApi: false,
      };
    }

    const page = options.page || 1;

    let endpoint = `${API_BASE_URL}/movie/popular?page=${page}`;

    if (options.search) {
      endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
        options.search
      )}&page=${page}`;
    }

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal,
    });

    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status}`);
    }

    const data = await response.json();

    let results: Movie[] = data.results || [];

    if (options.genre) {
      results = results.filter((movie) =>
        movie.genre_ids?.includes(options.genre!)
      );
    }

    results = sortMovies(results, options.sort);

    if (options.onlyFavorites) {
      const favorites = JSON.parse(
        localStorage.getItem("movie-app-favorites") || "[]"
      ) as number[];

      results = results.filter((movie) =>
        favorites.includes(movie.id)
      );
    }

    return {
      results,
      total_pages: data.total_pages || 1,
      total_results: data.total_results || results.length,
      isLiveApi: true,
    };
  },
};
