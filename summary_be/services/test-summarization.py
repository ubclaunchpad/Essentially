import unittest

from summarization import*

class Testing(unittest.TestCase):
    def test_preprocess(self):
        text = "The cats ate oreos from the cabinet."
        valid = ["cat", "ate", "oreo", "cabinet"]
        self.assertEqual(preprocess(text), valid)

    def test_tf(self):
        sent = "Mario jumps on careless mushrooms."
        valid = ["mario", "jump", "careless", "mushroom"]
        tf = 1 / 5
        self.assertEqual(preprocess(sent), valid)
        self.assertEqual(tf, tf_score("jump", sent))

    def test_idf(self):
        sent = "Mario jumps on careless mushrooms."
        valid = ["mario", "jump", "careless", "mushroom"]
        tf = 1 / 5
        self.assertEqual(preprocess(sent), valid)
        self.assertEqual(tf, tf_score("jump", sent))

if __name__ == '__main__':
    unittest.main()