const fs = require('fs');
const express = require('express');
const router = express.Router();

let wordHistory = [
  [{}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}],
];

let words = [];

const readWordsFile = () => {
  fs.readFile('db/words.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading the JSON file:', err);
      return;
    }

    // Parse the JSON data
    words = JSON.parse(data);
    usedWords = []
    // Now you can work with the parsed JSON data
    let actualword = ''

    const updateWord = () => {
      actualword = words[(Math.floor(Math.random() * words.length)) % words.length];
      console.log("new word ", actualword);
      usedWords.push(actualword)
    }
    updateWord()


    const colorize = (index, word, actualword) => {
      for (let i = 0; i < word.length; i++) {

        letterColor = wordHistory[index][i][word[i]]
        if (actualword[i] === word[i]) letterColor = 'green';
        else if (actualword.indexOf(word[i]) !== -1 && !wordHistory[index][i][word[i]] || wordHistory[index][i][word[i]] == ' ') letterColor = 'orange';
        else letterColor = ' '

        wordHistory[index][i][word[i]] = letterColor
      }

    };

    const checkWon = (actualword, guess) => {


      return actualword == guess;
    };

    router.post('/addWord', async (req, res) => {
      const { word, index } = req.body;

      colorize(index, word, actualword);
      let reso = checkWon(actualword, word)
      res.json(reso);
    });

    router.get('/getWordsHistory', async (req, res) => {
      res.json(wordHistory);
    });

    router.get('/reset', async (req, res) => {
      updateWord()

      wordHistory = [
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
      ];
      res.json("resetted")

    });


  });
};

// Call the function to read the words file and set up the exports
readWordsFile();

module.exports = router;
