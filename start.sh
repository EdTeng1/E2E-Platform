#!/bin/bash

gnome-terminal -- bash -c 'cd frontend; npm start; exec bash'
gnome-terminal -- bash -c 'cd backend; python questionnaire.py; exec bash'
