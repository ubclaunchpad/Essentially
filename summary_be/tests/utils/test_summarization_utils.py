import unittest

from utils.summarization import *

TEXT = "Chocolate chip cookies. Graham biscuit chocolate cheesecake."
sentences = sent_tokenize(TEXT)


class SummarizationUtilsTesting(unittest.TestCase):
    def test_preprocess(self):
        text = "The cats ate Oreos from the b cabinet."
        valid = ["cat", "ate", "oreo", "cabinet"]
        self.assertEqual(valid, preprocess(text))

    def test_get_word_freq(self):
        sent = "Gummy bear and the polar bear are friends"
        result = {"bear": 2, "friend": 1, "gummy": 1, "polar": 1}
        self.assertEqual(result, get_word_freq(preprocess(sent)))

    def test_idf_score(self):
        idf_chocolate = math.log10(1)
        idf_cheesecake = math.log10(2)
        self.assertEqual(idf_chocolate, idf_score("chocolate", sentences))
        self.assertEqual(idf_cheesecake, idf_score("cheesecake", sentences))

    def test_get_sentence_weights(self):
        sentence_weight = {
            0: tf_idf_score(sentences[0], sentences),
            1: tf_idf_score(sentences[1], sentences),
        }
        self.assertEqual(sentence_weight, get_sentence_weights(sentences))

    def test_get_top_scoring_sent(self):
        sentence_weight = {
            0: tf_idf_score(sentences[0], sentences),
            1: tf_idf_score(sentences[1], sentences),
        }
        self.assertEqual([1], get_top_scoring_sent(sentence_weight, 2))
