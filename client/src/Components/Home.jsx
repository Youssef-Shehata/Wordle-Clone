import Grid from './Grid'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import KeyboardLayout from './KeyboardLayout';
import NavBar from './NavBar';
// import { CloseButton } from 'react-bootstrap';




const Home = () => {





  const [isPopupOpen, setPopupOpen] = useState(false);

  const [playagain, setplayagain] = useState(false);

  const [won, setWon] = useState(false);
  const [lost, setLost] = useState({ "status": false, "word": "" });



  const PopupModal = ({ onPlayAgain, won }) => {
    if (won) return (
      <div className="popup">
        <div className="popup-content">
          <p>You Won!</p>
          <button className='playagain' onClick={onPlayAgain}>Play Again</button>
        </div>
      </div>
    );
    else {


      return (
        <div className="popup">
          <div className="popup-content">
            <p>You LOST!</p>
            <p>Word Is <span style={{ color: "green" }}>{lost.word.toUpperCase()}  </span></p>

            <button className='playagain' onClick={onPlayAgain}>Play Again</button>
          </div>
        </div>
      );

    }


  };



  const handlePlayAgain = () => {
    setplayagain(true)
    window.location.reload();
  };


  useEffect(() => {
    async function fetcho() {
      try {
        // Use axios to make a POST request
        await axios.post('http://localhost:8080/words/reset').then(response => {
          console.log(response.data)
          // Process the response data as needed
        });
      } catch (error) {
        console.error('Error submitting data:', error);
        // Handle the error as needed
      }

    }
    fetcho()



  }, [playagain])

  useEffect(() => {


    if (won) {
      setTimeout(() => {
        setPopupOpen(true);

      }, 100);
    }
    if (lost.status) {
      setTimeout(() => {
        setPopupOpen(true);

      }, 100)
    }

  }, [won, lost])


  return (
    <>
      <div className='nav-cont'>
        <NavBar />
      </div>
      <div className="home">

        <Grid won={won} setWon={setWon} setLost={setLost} />
        {isPopupOpen && (
          <PopupModal onPlayAgain={handlePlayAgain} won={won} />
        )}
      </div>
      {/* <div className='keyboard'> */}
      <KeyboardLayout />

      {/* </div> */}

    </>

  );
};

export default Home;
