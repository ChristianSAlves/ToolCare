import React, { createContext, useContext, useState } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  //Para mudar para o link do servidor, altera o link
  const [apiUrl, setApiUrl] = useState('http://127.0.0.1:8000');

  return (
    <ApiContext.Provider value={{ apiUrl, setApiUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
