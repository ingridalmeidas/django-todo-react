## Introduction

This is a simple Todo application built off Django (including the Django REST Framework for API CRUD operations) and React. For a complete walkthrough, see [Build a To-Do application Using Django and React](https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react)

## Requirements
* Python 3.9
* Pipenv
* Node.js 22.12+, 24.x, or 26+ (includes npm)

## Getting started
1. Clone the project: `git clone https://github.com/do-community/django-todo-react`
2. Navigate to the project directory: `cd django-todo-react`
3. Install the backend dependencies: `python3 -m pipenv install`
4. Install the frontend dependencies: `cd frontend && npm install`

## Run the application
You will need two terminals pointed to the frontend and backend directories to start the servers for this application.

1. In one terminal, run the backend from the project directory: `python3 -m pipenv run python backend/manage.py runserver`.
2. In another terminal, run the frontend from the project directory: `cd frontend && npm start`. The frontend runs at [localhost:3000](http://localhost:3000).

## Built With

* [React](https://reactjs.org) - A progressive JavaScript framework.
* [Python](https://www.python.org/) - A programming language that lets you work quickly and integrate systems more effectively.
* [Django](http://djangoproject.org/) - A high-level Python Web framework that encourages rapid development and clean, pragmatic design.

## Creator Credit

This demo app was originally built for a scotch.io (acquired in 2020 by DigitalOcean) article by [Jordan Irabor](https://github.com/Jordanirabor/django-todo-react)
