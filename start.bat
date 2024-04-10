start cmd /k "cd frontend && npm start"
:loop
timeout /t 5
netstat -ano | findstr :3000 >nul
if errorlevel 1 goto loop
start cmd /k "cd backend && python app.py"
