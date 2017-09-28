#!/bin/sh

sleep 5

gunicorn_thrift server.wsgi -b 0.0.0.0:8000