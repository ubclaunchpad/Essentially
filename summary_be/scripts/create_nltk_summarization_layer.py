# automation script to create Lambda layer for nltk and summarization
'''
Automate the following steps:
1. create a folder (as the working the directory) 
for the layer under summary_be/layers (if it does not exist)
2. copy summarization.py from summary_be/archive/utils
3. download nltk into the working directory
4. download nltk_data
'''
import subprocess
import os

# constants
dir_path = os.path.dirname(os.path.realpath(__file__))
LAYERS_BASE_DIR = dir_path + "\..\lambda_layers"
LAYER_NAME = "nltk_summarization_layer"
SUMMARIZATION_PY_DIR = r"..\..\..\archive\utils\summarization.py"

# step 1
os.chdir(rf"{LAYERS_BASE_DIR}")
subprocess.call("mkdir " + LAYER_NAME, shell=True)
os.chdir(LAYER_NAME)
subprocess.call("mkdir python", shell=True)
os.chdir("python")
subprocess.call("mkdir nltk_data", shell=True)

# step 2
subprocess.call("copy " + SUMMARIZATION_PY_DIR, shell=True)

# step 3
subprocess.call("pip install nltk -t . --upgrade --platform manylinux2014_x86_64 --implementation cp --python 3.9 --only-binary=:all:", shell=True)
subprocess.call("pip install regex -t . --upgrade")

# step 4
subprocess.call("python -W ignore -m nltk.downloader stopwords punkt wordnet omw-1.4 -d ./nltk_data", shell=True)
subprocess.call("pip install regex -t . --upgrade --platform manylinux2014_x86_64 --implementation cp --python 3.9 --only-binary=:all:", shell=True)

print("Process complete!")