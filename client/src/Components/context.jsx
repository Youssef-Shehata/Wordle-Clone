// context.js
import React, { createContext, useContext, useState } from 'react';

const KeyboardHistoryContext = createContext();

export const KeyboardHistoryProvider = ({ children }) => {
  const [reRender, setRender] = useState(0);
  const setReRender = () => {
    setRender(reRender + 1)


  }


  return (
    <KeyboardHistoryContext.Provider value={{ reRender, setReRender }}>
      {children}
    </KeyboardHistoryContext.Provider>
  );
};

export const useKeyboardHistory = () => {
  const context = useContext(KeyboardHistoryContext);
  if (!context) {
    throw new Error('useKeyboardHistory must be used within a KeyboardHistoryProvider');
  }
  return context;
};
