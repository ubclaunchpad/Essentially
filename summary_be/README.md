# Summarization Backend

This folder contains the Backend for Summarization-related services. Written in Python using Flask as the framework. Also contains Jupyter Notebook files for machine learning experimentation and testing.

`ml_notebook` is to store Jupyter Notebook files.

`routes` is where the API endpoints are defined.

`services` is where the actual logic for the endpoints are located.

`utils` is for common functions that are used within services; it's fore utility functions.

## Installation

1. Clone the respository
2. Make sure you have Python 3.4+ and latest pip installed
   - `python --version`
   - `pip --version`
3. Move to summary_be `cd summary_be`
4. Create a virtual environment `python -m venv venv`
5. Install dependencies `pip install -r requirements.txt`
6. Create a `.env` file and add `PORT=8000` (8000 is just a value; you can set whichever you want)

## Running the Server

1. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - MacOS or Linux: `source venv/bin/activate`
2. Start the Flask app by running `Python app.py`

Note: If you need to install new Python packages, make sure you run `pip freeze > requirements.txt` so that other developers will know to download the package as well.

Run `deactivate` to deactivate the virtual environment.

## API Endpoints

- [Endpoints documentation](https://docs.google.com/document/d/1Z19GKOGJVhKviADtvBEPEok53qLszR71e5_4Dz2MTGw/edit#)
