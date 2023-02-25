# Actual summarization logic

import nltk
import re
import math
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords

INVALID = r"[^a-zA-Z\s]"
STOP_WORDS = set(stopwords.words("english"))
lemmatizer = WordNetLemmatizer()

"""
    Function to clean and tokenize a chunk of text into words.

    Parameters
    ----------
    text : string
    - block of text to process

    Returns
    -------
    lemmatized_words : []
    - array of valid words
"""


def preprocess(text):
    # Remove invalid characters and digits
    text = re.sub(INVALID, "", text)

    # Remove stop words + convert to lower case
    words = word_tokenize(text)
    words = [word.lower() for word in words]
    stop_words_removed = [word for word in words if word not in STOP_WORDS]

    # Remove one character words
    valid_words = [word for word in stop_words_removed if len(word) > 1]

    # Lemmatize words, aka "builds" becomes "build" etc.
    lemmatized_words = [lemmatizer.lemmatize(word) for word in valid_words]

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
    - key is a string
    - val is an int
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
    Function to return sum of tf-idf score of words in a sentence.

    Parameters
    ----------
    sent : string
    - sentence containing word
    sentences : []
    - array of sentences in text

    Returns
    -------
    score : float
    - tf-idf score of sentence
"""


def tf_idf_score(sent, sentences):
    sent = re.sub(INVALID, "", sent)
    sent_len = len(word_tokenize(sent))
    words_in_given_sent = preprocess(sent)
    word_freq = get_word_freq(words_in_given_sent)

    score = 0
    for word in words_in_given_sent:
        tf = tf_score(word_freq[word], sent_len)
        idf = idf_score(word, sentences)
        tf_idf = tf * idf
        score += tf_idf

    return score


"""
    Function to return term frequency score of a word.

    Parameters
    ----------
    freq : int
    - frequency of word in given sentence
    sent_len : int
    - total number of words in sentence

    Returns
    -------
    tf_score : float
    - tf score of word
"""


def tf_score(freq, sent_len):
    return freq / sent_len


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
        if word in words:
            num_sent_containing_word += 1
    return math.log10(len(sentences) / num_sent_containing_word)


"""
    Function to return sentence weights based on tf-idf score

    Parameters
    ----------
    sentences : []
    - array of sentences in text

    Returns
    -------
    sentence_weight : {}
    - dictionary of sentence weights
    - key is index of sentence in sentences
    - val is tf-idf score
"""


def get_sentence_weights(sentences):
    sentence_weight = {}
    for x in range(len(sentences)):
        sentence = sentences[x]
        importance = tf_idf_score(sentence, sentences)
        sentence_weight[x] = importance
    sentence_weight = dict(
        sorted(sentence_weight.items(), key=lambda item: item[1], reverse=True)
    )
    return sentence_weight


"""
    Function to return indices of top scoring sentences

    Parameters
    ----------
    sentence_weight: {}
    - dictionary of sentence weights
    num_sent: int
    - number of top scoring sentences to return

    Returns
    -------
    sentence_idx : []
    - indices of top scoring sentences
"""


def get_top_scoring_sent(sentence_weight, num_sent):
    curr_num_sentences = 0
    sentence_idx = []
    for key in sentence_weight:
        if key == 0:
            continue
        if curr_num_sentences < num_sent - 1:
            sentence_idx.append(key)
            curr_num_sentences += 1
        else:
            break
    sentence_idx.sort()
    return sentence_idx


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
    if num_sentences < 1:
        raise Exception("Summary must have at least one sentence.")
    sentences = sent_tokenize(text)
    sentence_weight = get_sentence_weights(sentences)
    sentence_idx = get_top_scoring_sent(sentence_weight, num_sentences)

    summary = sentences[0]
    for x in range(len(sentences)):
        if x in sentence_idx:
            summary += " "
            summary += sentences[x]

    return summary
