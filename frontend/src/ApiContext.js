import React, { createContext, useContext, useState } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [apiUrl, setApiUrl] = useState('http://192.168.7.17:8000');
  return (
    <ApiContext.Provider value={{ apiUrl, setApiUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
