
from flask import Flask
from flask.ext.mail import Mail
from flask.ext.pymongo import PyMongo

from celery import Celery



app = Flask(__name__, static_folder='build')


app.config.from_object('config.environment_default')
try:
	app.config.from_object('config.environment_dev')
except ImportError:
	pass


app.mail = Mail(app)
app.mongo = PyMongo(app)
app.caches = {}


celery = Celery(app.import_name, broker=app.config['CELERY_BROKER_URL'])
celery.config_from_object(app.config)

from saturdays.tasks.execute import execute_task
from saturdays.tasks.trigger import trigger_tasks
from saturdays.tasks.scheduled import scheduled_tasks


from saturdays.helpers.verify_headers import *
from saturdays.helpers.access_control_origin import *
from saturdays.helpers.pages import *
from saturdays.helpers.filters import *


