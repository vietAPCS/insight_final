Start-Process powershell -ArgumentList "cd Insight; flask run"
Start-Process powershell -ArgumentList "cd question-generator; python app.py"
Start-Process powershell -ArgumentList "cd client/insight; python manage.py runserver 8000"
Start-Process powershell -ArgumentList "cd server; npm start"
