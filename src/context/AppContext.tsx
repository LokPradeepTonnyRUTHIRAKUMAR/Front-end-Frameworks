
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type { Movie, Theme } from "../types";

type State = {
  theme: Theme;
  favorites: Movie[];
};

type Action =
  | { type: "SET_THEME"; payload: Theme }
  | { type: "TOGGLE_FAVOURITE"; payload: Movie };

type AppContextType = {
  theme: Theme;
  toggleTheme: () => void;
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (id: number) => boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const FAVORITES_KEY = "cinegrid_favorites";
const THEME_KEY = "cinegrid_theme";

function readFavorites(): Movie[] {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed) ? (parsed as Movie[]) : [];
  } catch {
    return [];
  }
}

function createInitialState(): State {
  let theme: Theme = "dark";

  try {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === "light" || savedTheme === "dark") {
      theme = savedTheme;
    }
  } catch {
    // Keep the default theme.
  }

  return {
    theme,
    favorites: readFavorites(),
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload };

    case "TOGGLE_FAVOURITE": {
      const alreadyFavorite = state.favorites.some(
        (movie) => movie.id === action.payload.id
      );

      return {
        ...state,
        favorites: alreadyFavorite
          ? state.favorites.filter(
              (movie) => movie.id !== action.payload.id
            )
          : [...state.favorites, action.payload],
      };
    }

    default:
      return state;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    reducer,
    undefined,
    createInitialState
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", state.theme);

    try {
      localStorage.setItem(THEME_KEY, state.theme);
    } catch {
      // Storage may be unavailable.
    }
  }, [state.theme]);

  useEffect(() => {
    try {
      localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(state.favorites)
      );
    } catch {
      // Storage may be unavailable.
    }
  }, [state.favorites]);

  const toggleTheme = () => {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "dark" ? "light" : "dark",
    });
  };

  const toggleFavorite = (movie: Movie) => {
    dispatch({ type: "TOGGLE_FAVOURITE", payload: movie });
  };

  const isFavorite = (id: number) =>
    state.favorites.some((movie) => movie.id === id);

  return (
    <AppContext.Provider
      value={{
        theme: state.theme,
        toggleTheme,
        favorites: state.favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
