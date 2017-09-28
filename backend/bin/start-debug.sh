#!/bin/sh

sleep 5

/code/manage.py makemigrations
/code/manage.py migrate
/code/manage.py runserver