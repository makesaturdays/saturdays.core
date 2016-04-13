from saturdays import app
from saturdays import celery
from flask import request, abort, json

from saturdays.helpers.json import json_formater


@celery.task(name='search_index')
def search_index(type, id, body):

	app.search.index(index='saturdays', doc_type=type, body=json.dumps(body, sort_keys=False, default=json_formater), id=str(id))



@celery.task(name='search_delete')
def search_delete(type, id):
	
	app.search.delete(index='saturdays', doc_type=type, id=str(id))
