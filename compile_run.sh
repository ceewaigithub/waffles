#!/bin/bash

# Function to check if npm packages are installed and install them if they're not
check_and_install_packages() {
    if [ ! -d "node_modules" ]; then
        echo "Node modules not installed. Installing..."
        npm install
    else
        echo "Node modules already installed."
    fi
}

# Starting the backend server
echo "Starting the Node.js backend..."
cd server # Adjust this path to where your Node.js server code is located
check_and_install_packages
npm run start &
BACKEND_PID=$!

# Delay to ensure the backend server starts before attempting to launch the frontend
sleep 5

# Starting the React frontend
echo "Starting the React frontend..."
cd ../client # Adjust this path to where your React app code is located
check_and_install_packages
npm run start &
FRONTEND_PID=$!

# Trap to catch exit and ensure backend server is killed
trap "echo 'Stopping...'; kill $BACKEND_PID; kill $FRONTEND_PID; exit 1" INT

wait
