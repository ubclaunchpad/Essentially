from flask import Blueprint, request
from services.summarization import *

summarization_route = Blueprint('summarization_route', __name__)

@summarization_route.route('/articles/summary', methods=['GET'])
def get_summary():
    data = request.get_json()
    return get_summary_service(data.content.text, data.length)