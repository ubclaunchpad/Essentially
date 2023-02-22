from flask import make_response, abort
from utils.summarization import summarize
from error_handler.errors import APIError


def get_summary_service(text, num_sentences=3):
    if not text:
        raise APIError("Empty text", 400)

    if type(text) is not str or type(num_sentences) is not int:
        raise APIError("Bad Input Type", 400)

    try:
        result = summarize(text, num_sentences)
        num_words = len(result.split(" "))
        return make_response(
            {"summarized_text": result, "Meta": {"length": num_words}}, 200
        )
    except Exception as error:
        abort(500)
