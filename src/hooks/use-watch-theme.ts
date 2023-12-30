import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import useThemeStore from "@me/stores/theme";

const useWatchTheme = () => {
  const theme = useThemeStore(useShallow((state) => state.theme));

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
};

export default useWatchTheme;
