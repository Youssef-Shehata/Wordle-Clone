import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import axios from 'axios'
import { useKeyboardHistory } from './context';

const Row = ({ idx, max, won, setWon, current, setCurrent, setLost }) => {

  const [popup, setRenderPopup] = useState(false)
  const PopupModal = () => {
    return (
      <div className="wrongword-content">
        <p>not a real word mf</p>
      </div>
    );

  }

  const [submited, setSubmitted] = useState(false);
  const [word, setWord] = useState([]);
  const [locked, setLocked] = useState(false);
  const { reRender, setReRender } = useKeyboardHistory();
  const [commonWords, setCommonWords] = useState([]);


  const max_letters = max;
  const [wordHistory, setWordHistory] = useState([
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}]
  ]);


  useEffect(() => {
    async function fetcho() {
      try {
        // Use axios to make a POST request
        await axios.get('http://localhost:8080/words/getWordsHistory').then(response => {

          setWordHistory(response.data)
          console.log(wordHistory[idx][0][word[0]])

          // Process the response data as needed
        });
      } catch (error) {
        console.error('Error submitting data:', error);
        // Handle the error as needed
      }

    }
    fetcho()

  }, [submited, word])





  useEffect(() => {




    const handleSubmit = async (e) => {
      // Check if the index is not equal to the current index
      if (idx !== current) {
        return
      }
      e.preventDefault();

      // Combine array elements into a single string
      const joinedWord = word.join("");


      if (commonWords.indexOf(joinedWord) === -1) {
        setRenderPopup(true)
        setTimeout(() => {
          setRenderPopup(false)

        }, 500)
        return
      }
      // Check if there are no spaces in the word and it matches the actual word
      if (joinedWord.indexOf(" ") === -1 && joinedWord.length === max_letters) {
        try {
          // Use axios to make a POST request
          await axios.post('http://localhost:8080/words/addWord', { word: joinedWord, index: idx }).then(response => {
            setSubmitted(true);

            setLocked(true);

            setCurrent(idx + 1);
            let res = response.data
            console.log(response.data)
            setWon(res.status)
            if (idx === 5 && current === 5) {
              setLost({ "status": true, "word": res.actualword })
            }

            // Process the response data as needed
          });

        } catch (error) {
          console.error('Error submitting data:', error);
          // Handle the error as needed
        }
      }
    };

    if (idx !== current) return;


    const handleKeyInput = (e) => {
      let key = e.key
      if (locked || won) return;
      if (key === 'Backspace') {
        setWord(prevWord => prevWord.slice(0, -1));
      }
      if (key === 'Enter') {
        handleSubmit(e);
        setReRender()

      }
      if (/[a-zA-Z]/.test(key) && key.length === 1 && word.length < max_letters) {
        key = key.toLowerCase()

        setWord(prevWord => [...prevWord, key]);
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener('keydown', handleKeyInput);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyInput);
    };



  }, [word, locked, idx, current, won, max_letters, setReRender]);




  useEffect(() => {
    async function fetcho() {
      try {
        // Use axios to make a POST request
        await axios.get('http://localhost:8080/words/words').then(response => {

          setCommonWords(response.data)
          // Process the response data as needed
        });
      } catch (error) {
        console.error('Error submitting data:', error);
        // Handle the error as needed
      }

    }
    fetcho()

  }, [])






  const renderCell = (obj, index) => (

    (<Cell key={index} classy={obj[word[index]]} char={word[index]} />
    ));

  if (idx !== current) {
    return (
      <div className="row">
        {wordHistory[idx][0]
          ? wordHistory[idx].map((obj, index) => renderCell(obj, index))
          : Array.from({ length: max_letters }, (_, index) => renderCell(" ", index))}
      </div>
    );
  }

  return (
    <>

      <div className="row">
        {popup && <PopupModal />}


        {Array.from({ length: max_letters }).map((_, index) => (
          <React.Fragment key={index}>


            <Cell classy={wordHistory[idx][index][word[index]]} char={word[index]} />
          </React.Fragment>
        ))}</div>
    </>);
};

export default Row;
