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
let KeyboardHistory = {


}


const update_KeyboardHistory = () => {
  for (let i = 0; i < wordHistory.length; i++) {
    for (let j = 0; j < wordHistory.length; j++) {
      if (wordHistory[i] && wordHistory[i][j] && typeof wordHistory[i][j] === 'object' && Object.keys(wordHistory[i][j])[0] != undefined) {
        let key = Object.keys(wordHistory[i][j])[0];
        let color = wordHistory[i][j][key];
        if (KeyboardHistory[key] != 'green') {
          KeyboardHistory[key] = color

          if (color == 'gray')
            KeyboardHistory[key] = 'grayKey'



        }

      }
    }

  }

}

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
      do {
        actualword = words[(Math.floor(Math.random() * words.length)) % words.length];
      } while (usedWords.indexOf(actualword) != -1);


      console.log("new word ", actualword);
      usedWords.push(actualword)
    }
    updateWord()


    const colorize = (index, word, actualword) => {
      for (let i = 0; i < word.length; i++) {

        letterColor = wordHistory[index][i][word[i]]
        if (actualword[i] === word[i]) letterColor = 'green';
        else if (actualword.indexOf(word[i]) !== -1 && !wordHistory[index][i][word[i]] || wordHistory[index][i][word[i]] == ' ') letterColor = 'orange';
        else if (usedWords.reduce((acc, word) => {
          if (word.indexOf(word[i]) != -1) return acc = 1

        }


          , 0)) letterColor = 'gray'
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
      update_KeyboardHistory()
      let reso = checkWon(actualword, word)
      res.json(reso);
    });
    router.get('/words', async (req, res) => {

      res.json(words);
    });


    router.get('/getWordsHistory', async (req, res) => {
      res.json(wordHistory);
    });
    router.get('/getKeyboardHistory', async (req, res) => {
      // console.log(KeyboardHistory)

      res.json(KeyboardHistory);
    });

    router.post('/reset', async (req, res) => {
      updateWord()

      wordHistory = [
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
        [{}, {}, {}, {}, {}],
      ];
      KeyboardHistory = {}
      res.json("resetted")

    });


  });
};

// Call the function to read the words file and set up the exports
readWordsFile();

module.exports = router;
