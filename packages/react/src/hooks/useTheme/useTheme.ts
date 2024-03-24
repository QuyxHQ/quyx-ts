import { useThemeProvider } from "../../providers/ThemeProvider";

function useTheme() {
  const theme = useThemeProvider();
  return theme;
}

export default useTheme;
