# Actual summarization logic

import nltk
import os
import re
import math
import operator
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import sent_tokenize,word_tokenize
from nltk.corpus import stopwords

INVALID = r'[^a-zA-Z0-9\s]'
lemmatizer = WordNetLemmatizer()

"""
    Function to clean and tokenize a chunk of text into words.

    Parameters
    ----------
    text : string
    - block of text to process

    Returns
    -------
    text : []
    - array of valid words
"""
def preprocess(text):
    stop_words = set(stopwords.words('english'))

    # Remove evil >:) characters and digits
    text = re.sub(INVALID, '', text)
    text = re.sub(r'\d+', '', text)

    # Remove stop words + convert to lower case
    words = word_tokenize(text)
    stop_words_removed = []
    for word in words:
        word = word.lower()
        if word not in stop_words:
            stop_words_removed.append(word)

    # Remove one character words
    valid_words = []
    for word in stop_words_removed:
        if len(word) > 1:
            valid_words.append(word)

    # Lemmatize words, aka "builds" becomes "build" etc. 
    lemmatized_words = []
    for word in valid_words:
       lemmatized_words.append(lemmatizer.lemmatize(word))
    
    return lemmatized_words

"""
    Function to get frequency of words.

    Parameters
    ----------
    words : []
    - array of words

    Returns
    -------
    word_freq : {}
    - dictionary of word frequencies
"""
def get_word_freq(words):
    dict = {}
    unique_words = []
    for word in words:
       if word not in unique_words:
           unique_words.append(word)
    for word in unique_words:
       dict[word] = words.count(word)
    return dict

"""
    Function to return tf-idf score of a word.

    Parameters
    ----------
    word : string
    - word to compute score
    sent : string
    - sentence containing word
    sentences : []
    - array of all sentences in text

    Returns
    -------
    score : int
    - tf-idf score of word
"""
def tf_idf_score(word, sent, sentences):
    tf = tf_score(word, sent)
    idf = idf_score(word, sentences)
    return tf * idf

"""
    Function to return term frequency score of a word.

    Parameters
    ----------
    word : string
    - word to compute score
    sentence : string
    - sentence containing word

    Returns
    -------
    score : float
    - tf score of word
""" 
def tf_score(word, sentence):
    freq = 0
    sentence = re.sub(INVALID, '', sentence)
    words = word_tokenize(sentence)
    length = len(words)
    for word_ in words:
        word_ = lemmatizer.lemmatize(word_)
        if (word == word_):
            freq += 1
    return freq / length

"""
    Function to return inverse document frequency of a word.

    Parameters
    ----------
    word : string
    - word to compute score
    setences : []
    - array of sentences in text

    Returns
    -------
    score : float
    - idf score of word
""" 
def idf_score(word, sentences):
    num_sent_containing_word = 0
    for sent in sentences:
        words = preprocess(sent)
        word = lemmatizer.lemmatize(word)
        if (word in words):
            num_sent_containing_word += 1
    return math.log10(len(sentences) / num_sent_containing_word)

"""
    Function to get sentence importance in a given text.

    Parameters
    ----------
    text : string
    - text to summarize
    num_sentences : int
    - number of sentences to include in summary

    Returns
    -------
    sentence_importance : float
    - extractive summary of text
"""
def get_sentence_importance(sent, sentences):
    score = 0
    for word in preprocess(sent):
        score += tf_idf_score(word, sent, sentences)
    return score

"""
    Function to summarize a given text.

    Parameters
    ----------
    text : string
    - text to summarize
    num_sentences : int
    - number of sentences to include in summary

    Returns
    -------
    summary : string
    - extractive summary of text
"""

def summarize(text, num_sentences):
    sentences = sent_tokenize(text)
    sentence_importance = {}
    idx = 1

    for sentence in sentences:
        importance = get_sentence_importance(sentence, sentences)
        sentence_importance[idx] = importance
        idx += 1

    sentence_importance = sorted(sentence_importance.items(), key=operator.itemgetter(1),reverse=True)

    curr_num_sentences = 0
    summary = ""
    sentence_num = []
    for word in sentence_importance:
        if (curr_num_sentences < num_sentences):
            sentence_num.append(word[0])
            curr_num_sentences += 1
        else:
            break

    sentence_num.sort()
    cnt = 1
    for sentence in sentences:
        if cnt in sentence_num:
            summary += " "
            summary += (sentence)
        cnt = cnt+1

    return summary

#TODO
def getConfidenceLevel():
    print(True)

print(summarize("Elon Musk sold $3.95 billion worth of Tesla stock since completing his purchase of Twitter late last month. Musk’s Tesla stock sales, totaling 19.5 million shares, have been widely anticipated ever since the Tesla CEO reached a deal to buy Twitter for $44 billion. Musk had sold blocks of Tesla shares worth a total of $15.4 billion earlier this year since his deal to buy Twitter was announced. Twitter confirmed Musk bought the social media company October 27, but he waited until November 4 to start selling additional Tesla shares. He also sold blocks of Tesla stock on Monday and Tuesday this week, according to filings to the Securities and Exchange Commission late Tuesday night. It’s not clear if the money Musk raised went toward the Twitter purchase, or to support losses at Twitter since he took over. Musk disclosed last week that Twitter has seen a “massive drop in revenue,” as a growing number of advertisers pause spending on the platform in the wake of his takeover of the company. He blamed “activist groups” pressuring advertisers for the loss of ad dollars. He has announced plans to charge users $8 a month to have verified accounts, and also announced deep staff cuts. This is not the best time to be selling Tesla shares, which have lost 46% of their value so far this year on disappointing sales caused by supply chain problems. Musk received an average price of $202.52 for the Tesla shares he sold since the Twitter deal closed, which is down 10% just since he closed on his deal to buy Twitter. Shares of Tesla fell 0.7% in after-hours trading Tuesday. The company is facing growing competition in the electric vehicle market from established automakers such as Volkswagen, Ford and General Motors. And some investors have expressed concerns that Musk will be too distracted by his purchase of Twitter to give enough attention to addressing Tesla’s problems.", 3))