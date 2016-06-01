from flask import request, abort
from saturdays import app
from saturdays.helpers.json import to_json, json_formater

from saturdays.models.cms.error import Error


def raise_error(category, key, code=500, fields=None):
	errors = Error._values()
	document = {
		'category': category,
		'key': key,
		'code': code
	}

	if fields is not None:
		document['fields'] = fields

	try:
		document['message'] = errors[category][key]
	except KeyError:
		pass
	

	abort(to_json(document, code))