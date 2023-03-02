from .errors import *

from flask import jsonify, Blueprint

error_blueprint = Blueprint('error_handlers', __name__)

@error_blueprint.app_errorhandler(APIError)
def handle_API_error(err):
    response = {
        "message": err.args[0],
        "code": err.args[1]
    }

    return jsonify(response), err.args[1]

@error_blueprint.app_errorhandler(500)
def handle_500_error(err):
    response = {
        "message": str(err),
        "code": 500
    }

    return jsonify(response), 500