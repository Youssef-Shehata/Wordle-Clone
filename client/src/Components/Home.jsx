import Grid from './Grid'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { WordProvider } from './context';
import axios from 'axios'



const Home = () => {

  const [isPopupOpen, setPopupOpen] = useState(false);

  const [playagain, setplayagain] = useState(false);

  const [won, setWon] = useState(false);

  const PopupModal = ({ onPlayAgain }) => {
    return (
      <div className="popup">
        <div className="popup-content">
          <p>You Won!</p>
          <button onClick={onPlayAgain}>Play Again</button>
        </div>
      </div>
    );
  };




  const handlePlayAgain = () => {
    setplayagain(true)
    window.location.reload();
  };


  useEffect(() => {
    async function fetcho() {
      try {
        // Use axios to make a POST request
        await axios.get('http://localhost:8080/words/reset').then(response => {
          console.log(response.data)
          // Process the response data as needed
        });
      } catch (error) {
        console.error('Error submitting data:', error);
        // Handle the error as needed
      }

    }
    fetcho()

    if (won) {
      setPopupOpen(true);


    }


  }, [playagain])

  useEffect(() => {


    if (won) {
      setPopupOpen(true);


    }


  }, [won])


  return (
    <>
      <div className="home">
        <Grid won={won} setWon={setWon} />
        {isPopupOpen && (
          <PopupModal onPlayAgain={handlePlayAgain} />
        )}

      </div>
    </>

  );
};

export default Home;
