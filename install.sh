#!/bin/bash

# Change directory and install Python packages for Insight
osascript -e 'tell application "Terminal" to do script "cd Insight; pip install -r requirements.txt"'

# Change directory, create a directory, and install Python packages for question-generator
osascript -e 'tell application "Terminal" to do script "cd question-generator; mkdir static; pip install -r requirements.txt"'

# Change directory, install Python packages, and run Django migrations for client/insight
osascript -e 'tell application "Terminal" to do script "cd client/insight; pip install -r requirements.txt; python manage.py migrate"'

# Change directory and install Node.js packages for the server
osascript -e 'tell application "Terminal" to do script "cd server; npm install"'

