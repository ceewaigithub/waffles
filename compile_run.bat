@echo off

REM Function to check if npm packages are installed and install them if they're not
:check_and_install_packages
if not exist "node_modules" (
    echo Node modules not installed. Installing...
    npm install
) else (
    echo Node modules already installed.
)

REM Starting the backend server
echo Starting the Node.js backend server...
cd server
call :check_and_install_packages
start npm run start
set BACKEND_PID=%ERRORLEVEL%

REM Delay to ensure the backend server starts before attempting to launch the frontend
REM ping 127.0.0.1 -n 5 > nul
REM Countdown from 5
for /l %%i in (5,-1,1) do (
    echo in: %%i
    timeout /t 1 > nul
)

echo LET HIM COOK
REM Starting the React frontend
echo Starting the React frontend...
cd ../client
call :check_and_install_packages
start npm run start
set FRONTEND_PID=%ERRORLEVEL%

REM Trap to catch exit and ensure backend server is killed
echo Press Ctrl+C to stop...
:trap
echo Stopping...
taskkill /F /PID %BACKEND_PID% > nul
taskkill /F /PID %FRONTEND_PID% > nul
exit /b 1

:check_and_install_packages