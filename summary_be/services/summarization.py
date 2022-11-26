from flask import make_response
from utils.summarization import summarize

def get_summary_service(text, num_sentences=3):
    if not text:
        return make_response({
            "message": "Empty Text"
        }, 400)

    if type(text) is not str or type(num_sentences) is not int:
        return make_response({
            "message": "Bad Input Type"
        }, 400)

    try:
        result = summarize(text, num_sentences)
        num_words = len(result.split(' '))
        return make_response({
            "summarized_text": result,
            "Meta": {
                "length": str(num_words)
            }
        }, 200)
    except Exception as error:
        return make_response({
            "message": str(error)
        }, 400)
