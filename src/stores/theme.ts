import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Theme = "light" | "dark";

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const useThemeStore = create<ThemeStore>()(
  devtools(
    persist(
      (set) => ({
        theme: "light",
        setTheme: (theme) => set({ theme }),
        toggleTheme: () =>
          set((state) => ({
            theme: state.theme === "light" ? "dark" : "light",
          })),
      }),
      {
        name: "theme",
      },
    ),
  ),
);

export default useThemeStore;
