
from bs4 import BeautifulSoup
from datetime import datetime,timedelta
import json
import re
import requests

formatting_spaces = '\r\n                        \r\n                            '

all_of_it = {}

for i in range(1, 5000):
    date = datetime.today() - timedelta(days=i)
    url = date.strftime('https://nytbee.com/Bee_%Y%m%d.html')
    r = requests.get(url, headers={"User-Agent": '47.0.2526.111'})
    if not r.ok:
        print('Ended with code', str(r.status_code))
        break
    html_string = r.text
    soup = BeautifulSoup(html_string, 'html.parser')

    official_words_soup = soup.find(id=['main-answer-list'])
    if official_words_soup is None:
        official_words_soup = soup.find(class_='answer-list')

    official_words = [word.text.strip(formatting_spaces) for word in official_words_soup.find_all('li')]
    official_letters = set(official_words_soup.ul.strong.text)

    pangrams = [pangram.text for pangram in official_words_soup.find_all('strong')]
    points_for_genius = int(soup.find(string = re.compile('Points Needed for Genius: \d*')).strip('Points Needed for Genius: '))

    official_panagrams = []
    for word in official_words:
        if all(letter in word for letter in official_letters):
            official_panagrams.append(word)

    central_letter_options = [letter for letter in official_letters if all(letter in word for word in official_words)]

    puzzle_details = {
            'official_words': official_words,
            'official_panagrams': official_panagrams,
            'official_letters': list(official_letters),
            'central_letter_options': central_letter_options,
            'pangrams': pangrams,
            'points_for_genius': points_for_genius
        }

    # all_of_it[date.strftime('%Y-%m-%d')] = puzzle_details
    print(puzzle_details)
    with open('saved_puzzles/offical_puzzle_'+date.strftime('%Y-%m-%d')+'.json', 'w') as file:
        file.write(json.dumps(puzzle_details))


# with open('all_bee_puzzles.json', 'w') as file:
#     file.write(json.dumps(all_of_it))
