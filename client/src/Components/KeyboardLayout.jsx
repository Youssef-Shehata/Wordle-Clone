import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useKeyboardHistory } from './context';

const KeyboardLayout = ({ state }) => {
  const [keyColors, setKeyColors] = useState({});


  const { reRender, setReRender } = useKeyboardHistory();

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



  const row1 = Array.from({ length: 10 - 0 + 1 }, (_, index) => index);
  return (
    <div className='keyboard'>
      <div className='key-row'>
        {alphabet.map((letter, index) => {
          if (index < 10) {
            return renderKey(letter);
          }
          return null; // or an empty fragment: <React.Fragment key={index}></React.Fragment>
        })}
      </div>
      <div className='key-row'>
        {alphabet.map((letter, index) => {
          if (index > 9 && index < 19) {
            return renderKey(letter);
          }
          return null; // or an empty fragment: <React.Fragment key={index}></React.Fragment>
        })}
      </div>
      <div className='key-row'>
        {alphabet.map((letter, index) => {
          if (index > 18) {
            return renderKey(letter);
          }
          return null; // or an empty fragment: <React.Fragment key={index}></React.Fragment>
        })}
        {renderKey('enter')}

      </div>

    </div>
  );
};

export default KeyboardLayout;