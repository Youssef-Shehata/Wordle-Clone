import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useKeyboardHistory } from './context';

const KeyboardLayout = ({ state }) => {
  const [keyColors, setKeyColors] = useState({});


  const { reRender, useReRender } = useKeyboardHistory();

  useEffect(() => {
    async function fetcho() {
      try {
        // Use axios to make a POST request
        await axios.get('http://localhost:8080/words/getKeyboardHistory').then(response => {
          setKeyColors(response.data)
          console.log("updating keyboard")
          // Process the response data as needed
        });
      } catch (error) {
        console.error('Error submitting data:', error);
        // Handle the error as needed
      }

    }
    fetcho()

  }, [reRender])

  const handleClick = (key) => {
    window.alert("use keyboard")

  };



  const renderKey = (key) => (

    key === 'enter'
      ? (
        <button className='enter'
          key={key}
          onClick={handleClick}
        >
          {key === 'enter' ? '⏎' : key.toUpperCase()}
        </button>
      )
      : (
        <div className={'key ' + keyColors[key]}
          key={key}
        >
          {key === 'enter' ? '⏎' : key.toUpperCase()}
        </div>
      )
  );


  const alphabet = 'qwertyuiopasdfghjklzxcvbnm'.split('');

  return (

    <div className='keyboard' >
      {alphabet.map((letter) => renderKey(letter))}
      {renderKey('enter')}



    </div>
  );
};

export default KeyboardLayout;
