Start-Process powershell -ArgumentList "cd Insight; pip install -r requirements.txt"
Start-Process powershell -ArgumentList "cd question-generator; mkdir static; pip install -r requirements.txt"
Start-Process powershell -ArgumentList "cd client/insight; pip install -r requirements.txt; python manage.py migrate"
Start-Process powershell -ArgumentList "cd server;npm install;"