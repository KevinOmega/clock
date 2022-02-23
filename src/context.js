import React, { useContext, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [season, setSeason] = useState(25);
  const [rest, setRest] = useState(5);
  const [time, setTime] = useState({ minutes: season, seconds: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [currentType, setCurrentType] = useState(true);

  return (
    <AppContext.Provider
      value={{
        season,
        rest,
        time,
        isRunning,
        currentType,
        setSeason,
        setRest,
        setTime,
        setIsRunning,
        setCurrentType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGLobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGLobalContext };
