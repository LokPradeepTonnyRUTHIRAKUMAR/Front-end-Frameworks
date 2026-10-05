import { useCallback, useEffect, useState } from "react";
import { movieService } from "../services/movieService";
import type { Movie } from "../types";

interface UseMoviesOptions {
  search?: string;
  genre?: number;
  sort?: string;
  onlyFavorites?: boolean;
  page?: number;
}

export function useMovies(options: UseMoviesOptions = {}) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLiveApi, setIsLiveApi] = useState(false);

  const fetchMovies = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      setError(null);

      try {
        const data = await movieService.fetchMovies(options, signal);

        setMovies(data.results);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
        setIsLiveApi(data.isLiveApi);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load movies."
        );
      } finally {
        setLoading(false);
      }
    },
    [options.search, options.genre, options.sort, options.onlyFavorites, options.page]
  );

  useEffect(() => {
    const controller = new AbortController();

    fetchMovies(controller.signal);

    return () => {
      controller.abort();
    };
  }, [fetchMovies]);

  return {
    movies,
    loading,
    error,
    totalPages,
    totalResults,
    isLiveApi,
    refetch: () => fetchMovies(),
  };
}
