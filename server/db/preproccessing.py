import json
from nltk.corpus import words

# Download the words corpus if not already downloaded
import nltk
# nltk.download('words')

# Extract English words from NLTK corpus
english_words = words.words()
words =  []
# Specify the path where you want to save the JSON file
json_file_path = 'english_words.json'
for word in english_words:
    if(len(word) ==5 ):
        words.append(word)









with open("Geussing_words.json", 'w') as file:
    json.dump(words, file, indent=2)

