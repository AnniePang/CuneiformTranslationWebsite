#!/bin/bash

# Function to handle cleanup on script exit
cleanup() {
    echo "Shutting down services..."
    kill $(jobs -p)
    exit
}

# Set up cleanup trap
trap cleanup EXIT

# Start FastAPI backend
echo "Starting FastAPI backend..."
cd capstone-api/mlapi  # Replace with your actual backend path
poetry install
poetry run uvicorn src.main:app --reload &

# Wait a moment to ensure backend starts
sleep 10

# Start frontend
echo "Starting frontend..."
cd ../../my-app  # Replace with your actual frontend path
npm install
npm start &

# Keep script running and show status
echo "Both services started!"
echo "Backend available at: http://127.0.0.1:8000"
echo "Press Ctrl+C to stop all services"

# Wait for all background processes
wait