const FAVORITES_KEY = "movie-app-favorites";
const THEME_KEY = "movie-app-theme";
const API_KEY = "movie-app-api-key";

export function getFavorites(): number[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(movieId: number): number[] {
  const favorites = getFavorites();

  const updatedFavorites = favorites.includes(movieId)
    ? favorites.filter((id) => id !== movieId)
    : [...favorites, movieId];

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));

  return updatedFavorites;
}

export function getTheme(): string {
  return localStorage.getItem(THEME_KEY) || "light";
}

export function setTheme(theme: string): void {
  localStorage.setItem(THEME_KEY, theme);
}

export function getApiKey(): string {
  return localStorage.getItem(API_KEY) || "";
}

export function setApiKey(apiKey: string): void {
  localStorage.setItem(API_KEY, apiKey);
}
