import React, { createContext, useContext } from "react";
import { Theme } from "../types";

type Props = {
  children: React.JSX.Element;
  theme?: Theme;
};

const ThemeContext = createContext<Theme>("light");

export const useThemeProvider = () => useContext(ThemeContext);

const ThemeProvider: React.FC<Props> = ({ children, theme }) => {
  return (
    <ThemeContext.Provider value={theme || "light"}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
