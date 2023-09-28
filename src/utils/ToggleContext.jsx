import { createContext, useContext, useState } from "react";

const Context = createContext();

export const ToggleProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);

  const toggleButton = () => {
    setToggle(!toggle);
  };

  return (
    <Context.Provider value={{ toggle, toggleButton }}>
      {children}
    </Context.Provider>
  );
};

export const useToggle = () => {
  return useContext(Context);
};
