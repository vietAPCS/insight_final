#!/bin/bash

# Open a terminal window and run the first command
osascript -e 'tell application "Terminal" to do script "cd Insight;pip install -r requirements.txt; flask run"'

# Open a terminal window and run the second command
osascript -e 'tell application "Terminal" to do script "cd question-generator;pip install -r requirements.txt; python app.py"'

# Open a terminal window and run the third command
osascript -e 'tell application "Terminal" to do script "cd client/insight; virEnv/Scripts/activate; python manage.py runserver"'

# Open a terminal window and run the fourth command
osascript -e 'tell application "Terminal" to do script "cd server; npm install; npm start"'
