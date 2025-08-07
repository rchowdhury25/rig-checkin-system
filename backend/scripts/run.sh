#!/bin/sh

set -e

python -B manage.py wait_for_db
python -B manage.py collectstatic --noinput
python -B manage.py migrate

uwsgi --socket :9000 --workers 4 --master --enable-threads --module myproject.wsgi