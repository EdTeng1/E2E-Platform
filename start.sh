#!/bin/bash

# Navigate to the frontend directory and start the application
cd frontend && npm start &

# Loop until the service is available on port 3000
while ! nc -z localhost 3000; do
  sleep 5
done

# Navigate to the backend directory and start the Python Flask application
cd ../backend && FLASK_APP=app flask run &