import React, { createContext, useReducer } from 'react';

import reducer from './reducer';
import appState from './state';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const useReducerValue = useReducer(reducer, appState);

  return (
    <AppContext.Provider value={useReducerValue}>
      {children}
    </AppContext.Provider>
  );
};