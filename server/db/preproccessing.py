import json
from nltk.corpus import brown
from collections import OrderedDict
import re
from nltk.corpus import words
import string


# Download the words corpus if not already downloaded
import nltk
# nltk.download('words')

# Extract English words from NLTK corpus
firstwords = brown.words()
# print(len(firstwords))

secondwords = words.words()
english_words = firstwords+secondwords
# print(len(english_words))

english_words = list(OrderedDict.fromkeys(english_words))

# english_words = set(english_words)
words =  []
# Specify the path where you want to save the JSON file
# def has_repeating_letters(word):
#     # Check if any letter is repeated in the word
#     return len(set(word)) != len(word)

json_file_path = 'english_words.json'

stop_words = set(nltk.corpus.stopwords.words('english'))
for word in english_words:
    word = re.sub(r'[^a-zA-Z\s]', '', word, flags=re.IGNORECASE)
    if len(word) == 5 and word.casefold() not in stop_words and word.casefold() not in string.punctuation  :
        words.append(word.lower())



# with open("words.json", 'w') as file:
#     json.dump(words, file, indent=2)

