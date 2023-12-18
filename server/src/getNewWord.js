const fs = require('fs');

// words = fetch json file 

// Read the JSON file
fs.readFile('db/words.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the JSON file:', err);
    return;
  }

  // Parse the JSON data
  const jsonData = JSON.parse(data);

  // Now you can work with the parsed JSON data
  console.log(jsonData);
});



exports.getNewWord = async (req, res) => {
  let newWord = words[(Math.floor(Math.random() * words.length)) % words.length];

  res.json(newWord)
}


