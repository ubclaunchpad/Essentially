import os
from flask import Flask
from flask_cors import CORS
import dotenv

basedir = os.path.abspath(os.path.dirname(__file__))
secret_file = os.path.join(basedir, ".env")
if os.path.isfile(secret_file):
    dotenv.load_dotenv(secret_file)

app = Flask(__name__)
CORS(app)
PORT = "8000"
if 'PORT' in os.environ:
    PORT = os.environ['PORT']

if __name__ == '__main__':
    app.run(port=PORT, debug=True)