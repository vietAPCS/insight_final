Start-Process powershell -ArgumentList "cd Insight; pip install -r requirements.txt; flask run"
Start-Process powershell -ArgumentList "cd question-generator; pip install -r requirements.txt; python app.py"
Start-Process powershell -ArgumentList "cd client/insight; virEnv/Scripts/activate; python manage.py runserver"
Start-Process powershell -ArgumentList "cd server;npm install; npm start"
