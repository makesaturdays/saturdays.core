from saturdays import app
from saturdays.helpers.json import to_json, json_formater
from saturdays.models.cms.piece import Piece
from saturdays.models.ecom.product import Product

from flask import request, abort
from flask import render_template, json

from werkzeug.contrib.cache import SimpleCache

import os



app.caches['/errors'] = SimpleCache()

@app.errorhandler(404)
def not_found(error):
	cached_template = app.caches['/errors'].get(request.path)
	if cached_template is None or app.config['DEBUG']:
		response = {
			'pieces': Piece._values(),
			'current_path': request.path,
			'debugging': app.config['DEBUG']
		}
		response['pieces_json'] = json.dumps(response['pieces'], sort_keys=False, default=json_formater)

		print(error)

		render = render_template('errors/' + str(error.code) + '.html', **response)
		app.caches['/errors'].set(request.path, render, timeout=0)
		return render

	else:
		return cached_template

