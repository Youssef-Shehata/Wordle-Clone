import pandas as pd
import json

words =pd.read_csv('words.csv')
# print(words)

words = words.drop_duplicates()
words = words.reset_index(drop=True)
words = words[words['words'].apply(lambda x: len(x) == 5)]
wordo = []
for word in words['words']:
    wordo.append(word)
with open("words.json", 'w') as file:
    json.dump(wordo, file, indent=2)

