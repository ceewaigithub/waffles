# Function to check if npm packages are installed and install them if they're not
function CheckAndInstallPackages {
    if (!(Test-Path -Path "node_modules")) {
        Write-Host "Node modules not installed. Installing..."
        npm install
    } else {
        Write-Host "Node modules already installed."
    }
}

# Starting the backend server
Write-Host "Starting the Node.js backend server..."
Set-Location -Path server
CheckAndInstallPackages
$backendProcess = Start-Process -PassThru npm -ArgumentList 'run', 'start'

# Delay to ensure the backend server starts before attempting to launch the frontend
Write-Host "LET HIM COOK"
Start-Sleep -Seconds 5

# Starting the React frontend
Write-Host "Starting the React frontend..."
Set-Location -Path ../client
CheckAndInstallPackages
$frontendProcess = Start-Process -PassThru npm -ArgumentList 'run', 'start'

# Trap to catch exit and ensure backend server is killed
Set-Location -Path ../
Write-Host "Press Ctrl+C to stop..."
try {
    # Wait indefinitely
    while ($true) { Start-Sleep -Seconds 1 }
} finally {
    Write-Host "Stopping..."
    Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
}