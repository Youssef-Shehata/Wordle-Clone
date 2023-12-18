import React, { createContext, useState, useEffect } from 'react';

const WordContext = createContext();

const WordProvider = ({ children }) => {
  const [rightWord, setRightWord] = useState(''); // Change here to setRightWord
  const [words, setWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch('words.json');
      const data = await response.json();
      setWords(data);
    } catch (error) {
      console.error('Error fetching words data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      updateRightWord(); // Change here to updateRightWord
    }
  }, [words]);

  const updateRightWord = () => {
    let newWord = words[(Math.floor(Math.random() * words.length)) % words.length];
    setRightWord(newWord);
  };

  const value = { rightWord, updateRightWord }; // Change here to updateRightWord

  return (
    <>
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <WordContext.Provider value={value}>
          {children}
        </WordContext.Provider>
      )}
    </>
  );
};

export { WordProvider, WordContext };
