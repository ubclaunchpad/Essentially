import pandas as pd
import numpy as np
import spacy
from spacy.language import Language
import tensorflow as tf
from tensorflow import keras
from sentence_transformers import SentenceTransformer

model = tf.keras.models.load_model('/lstm_bi25')

def preprocess(text,
               nlp = spacy.load("en_core_web_sm"),
               embedder = SentenceTransformer('distilbert-base-nli-mean-tokens'),
               min_len = 2):
  @Language.component("custom_sentencizer")
  def custom_sentencizer(doc):
      for i, token in enumerate(doc[:-2]):
          # Define sentence start if it occurs after "\n\n" or "\n" 
          if token.text == "\n\n" or token.text == "\n":
              doc[i + 1].is_sent_start = True
      return doc
  nlp = spacy.load("en_core_web_sm")
  nlp.add_pipe("custom_sentencizer", before="parser")
  text = nlp(text)
  sents = list(text.sents)
  
  # remove sentences with length below threshold
  sents_clean = [sent.text for sent in sents if len(sent) > min_len]
  sents_clean = [sent for sent in sents_clean if len(sent)!=0]

  # calculate sentence embeddings
  sents_embedding= np.array(embedder.encode(sents_clean, convert_to_tensor=True))
  return sents_clean, sents_embedding

def summarize(text):
    sentences, embeddings = preprocess(text)

    reshape_func = lambda x: x.reshape(1, x.shape[0], x.shape[1])
    x = reshape_func(embeddings)

    y_pred = model.predict(x, verbose=0)
    idx = np.argsort(y_pred.flatten())[-3:]
    idx = sorted(idx)
    pred_summary = ""
    for i in idx:
        pred_summary += ' '
        pred_summary += sentences[i]
        pred_summary.strip()
        
    return pred_summary