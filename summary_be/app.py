import os
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
PORT = "8001"

if __name__ == '__main__':
    app.run(port=PORT, debug=True)