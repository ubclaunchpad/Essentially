import json

from flask import Blueprint, request
from services.summarization import *

summarization_route = Blueprint("summarization_route", __name__)


@summarization_route.route("/articles/summary", methods=["POST"])
def get_summary():
    data = json.loads(request.data)
    return get_summary_service(data["content"]["text"], data["length"])


@summarization_route.route("/status", methods=["GET"])
def get_status():
    return make_response({"message": "Active"}, 200)
    
