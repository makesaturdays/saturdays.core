
from flask import Flask
from flask.ext.pymongo import PyMongo

from celery import Celery
from elasticsearch import Elasticsearch, Urllib3HttpConnection
import certifi


app = Flask(__name__, static_folder='../build')


app.config.from_object('config.environment_default')
try:
	app.config.from_object('config.environment_dev')
except ImportError:
	pass

app.mongo = PyMongo(app)
app.caches = {}

app.search = Elasticsearch(
	app.config['ELASTICSEARCH_HOST'].split(','),
	connection_class=Urllib3HttpConnection,
	http_auth=(app.config['ELASTICSEARCH_USER'], app.config['ELASTICSEARCH_PASSWORD']),
	use_ssl=True,
	verify_certs=True,
	ca_certs=certifi.where()
)


celery = Celery(app.import_name, broker=app.config['CELERY_BROKER_URL'])
celery.config_from_object(app.config)

from saturdays.tasks.execute import execute_task
from saturdays.tasks.trigger import trigger_tasks
from saturdays.tasks.scheduled import scheduled_tasks
from saturdays.tasks.search import search_index, search_delete

# execute_task(task={
# 	'has_email': True,
# 	'email_subject': 'TEST2',
# 	'email_to': 'phil@boeuf.coffee',
# 	'email_template': 'order-workshop',
# }, data={
# 	'order': {
# 		'_id': '12222'
# 	}
# })

from saturdays.pages.pages import *
from saturdays.pages.docs import *
from saturdays.pages.errors import *

from saturdays.helpers.verify_headers import *
from saturdays.helpers.access_control_origin import *
from saturdays.helpers.filters import *


