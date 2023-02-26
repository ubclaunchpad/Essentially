# automation script to create Lambda layer for nltk and summarization
'''
Automate the following steps:
1. create a folder (as the working the directory) 
for the layer under summary_be/layers (if it does not exist)
2. copy summarization.py from summary_be/archive/utils
3. download nltk into the working directory
4. download the required nltk data
'''
import subprocess
import os

# constants
dir_path = os.path.dirname(os.path.realpath(__file__))
LAYERS_BASE_DIR = dir_path + "\..\lambda_layers"
LAYER_NAME = "nltk_summarization_layer"
SUMMARIZATION_PY_DIR = r"..\..\archive\utils\summarization.py"

# step 1
os.chdir(rf"{LAYERS_BASE_DIR}")
subprocess.call("mkdir " + LAYER_NAME, shell=True)
os.chdir(LAYER_NAME)

# step 2
subprocess.call("copy " + SUMMARIZATION_PY_DIR, shell=True)

# step 3
subprocess.call("pip install nltk -t . --upgrade", shell=True)

# step 4
subprocess.call("python -m nltk.downloader stopwords punkt wordnet omw-1.4 -d .", shell=True)

print("Process complete!")