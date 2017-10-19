#!/bin/sh

sleep 5

/code/manage.py makemigrations
/code/manage.py migrate

echo "from django.contrib.auth.models import User; User.objects.filter(email='admin@example.com').delete(); User.objects.create_superuser('admin', 'admin@example.com', 'nimda')" | python manage.py shell

/code/manage.py runserver 0.0.0.0:8000