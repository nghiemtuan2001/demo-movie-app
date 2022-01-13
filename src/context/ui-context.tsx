import { createContext, useState, useContext } from "react";

interface uiContext {
  appTitle: string;
  setAppTitle: (title: string) => void;
}

const UiContext = createContext<uiContext>({
  appTitle: "",
  setAppTitle: (title) => {},
});

export const UiContextProvider: React.FC = ({ children }) => {
  const [appTitle, setAppTitle] = useState("Xemphimz");
  const handleSetTitle = (title: string) => {
    setAppTitle(title);
  };

  const value = { appTitle: appTitle, setAppTitle: handleSetTitle };
  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

export const useUiContext = () => {
  return useContext(UiContext);
};
