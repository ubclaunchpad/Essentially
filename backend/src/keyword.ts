// @ts-nocheck
import { TokenizerEn, StopwordsEn, StemmerEn } from "@nlpjs/lang-en";

const CHARACTER_PATTERN = /[^a-zA-Z ]/g;
const HTML_CODE_PATTERN = /<\/?[^>]+(>|$)/g

/**
 * Preprocess input text, perform text cleaning
 * @param text Text to be preprocessed
 * @returns {string} preprocessed text
 */
function preprocess(text) {
  text = text.replace(CHARACTER_PATTERN, "");
  text = text.replace(HTML_CODE_PATTERN, "");
  text = text.toLowerCase();
  return text;
}

/**
 * Tokenize text, and remove stop words from it, and stem the word to get its lemma
 * @param text input text
 * @returns {*} an object that contains field: wordList, stemList, stemToWorldList
 * wordList: array of string that contains words after tokenization and remove stop words
 * stemList: array of string that contains lemma for each word in wordList
 * stemToWorldList: a map that map lemma to a list of words that could be stemmed to the lemma key
 */
function getTokenizeAndStem(text) {
  let stemAndTokenize = {};

  const tokenizer = new TokenizerEn();
  const stopwords = new StopwordsEn();
  stemAndTokenize.wordList = stopwords.removeStopwords(tokenizer.tokenize(text));
  const stemmer = new StemmerEn();
  stemAndTokenize.stemList = stemmer.stem(stemAndTokenize.wordList);

  let stemToWordList = buildStemToWordList(
    stemmer,
    stemAndTokenize.wordList,
    stemAndTokenize.stemList
  );
  stemAndTokenize.stemToWordList = stemToWordList;

  return stemAndTokenize;
}

/**
 * Construct a map that map lemma to a list of words that could be stemmed to the lemma key
 * @param stemmer Stemmer helper for stem the word {@link https://github.com/axa-group/nlp.js/blob/2f5116c784/packages/lang-en-min/src/stemmer-en.js}
 * @param wordList array of string that contains words after tokenization and remove stop words
 * @param stemList array of string that contains lemma for each word in wordList
 * @returns {Map<any, any>} a map that map lemma to a list of words that could be stemmed to the lemma key
 */
function buildStemToWordList(stemmer, wordList, stemList) {
  let stemToWordList = new Map();

  stemList.forEach((stemKey) => stemToWordList.set(stemKey, []));

  wordList.forEach((word) => {
    let stemmed = stemmer.stemWord(word);
    if (stemToWordList.has(stemmed)) {
      stemToWordList.get(stemmer.stemWord(word)).push(word);
    }
  });

  return stemToWordList;
}

/**
 * Construct and return a textMetaInfo object which contains
 *
 * text: the original text
 * stemAndTokenize: an object that contains field: wordList, stemList, stemToWorldList, returned by getTokenizeAndStem()
 * wordList: the tokenized list of word in the text,
 * individualStemCount: stemmed word to stemmed word count map
 * totalStemCount: total stem count
 *
 * @param text the text
 * @returns {{}} object to be returned
 */
function getTextMetaInfo(text) {
  let textMetaInfo = {};

  textMetaInfo.text = text;
  textMetaInfo.stemAndTokenize = getTokenizeAndStem(text);

  textMetaInfo.individualStemCount = getIndividualWordCountFromWordList(
    textMetaInfo.stemAndTokenize.stemList
  );

  textMetaInfo.totalStemCount = textMetaInfo.stemAndTokenize.stemList.length;

  return textMetaInfo;
}

/**
 * Construct and return a word to word count map
 * @param wordList list of words extracted from the original documents
 * @returns {Map<any, any>} word to word count map
 */
function getIndividualWordCountFromWordList(wordList) {
  let individualWordCount = new Map();
  wordList.forEach((word) => {
    individualWordCount.set(
      word,
      (individualWordCount.has(word) ? individualWordCount.get(word) : 0) + 1
    );
  });
  return individualWordCount;
}

/**
 * Sort word based on their word count in a text
 * @param individualWordCount a word to word count map
 * @returns {*[]} a string array contains words sorted by its count
 */
function getSortedKeys(individualWordCount) {
  return [...individualWordCount.keys()].sort((word1, word2) => {
    return individualWordCount.get(word2) - individualWordCount.get(word1);
  });
}

/**
 * Extract keywords from raw text
 * @param textMetaInfo textMetaInfo return by getSentenceMetaInfo
 * @param numKeywords number of keywords wanted
 * @returns {*} a string array that contains the keywords extracted
 *
 */
function getKeywordsFromPreprocessedText(textMetaInfo, numKeywords) {
  numKeywords = Math.min(numKeywords, textMetaInfo.totalStemCount);
  let sortedWords = getSortedKeys(textMetaInfo.individualStemCount);
  return sortedWords
    .map((stemmedKey) => textMetaInfo.stemAndTokenize.stemToWordList.get(stemmedKey)[0])
    .slice(0, numKeywords);
}

/**
 * Extract keywords from raw text
 * @param text input text
 * @param numKeywords number of keywords wanted, default is 1
 * @returns {*} a string array that contains the keywords extracted
 *
 */
function getKeywordsFromText(text, numKeywords = 5) {
  text = preprocess(text);
  let textMetaInfo = getTextMetaInfo(text);
  return getKeywordsFromPreprocessedText(textMetaInfo, numKeywords);
}

export { getKeywordsFromText };
