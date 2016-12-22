
from saturdays import app
from saturdays.helpers.json import to_json, json_formater
from saturdays.models.cms.piece import Piece
from saturdays.models.ecom.product import Product

from config.categories import categories

from flask import request, abort
from flask import render_template, json

from werkzeug.contrib.cache import SimpleCache

import os



def page():
	cached_template = app.caches['/pages'].get(request.path)
	if cached_template is None or app.config['DEBUG']:
		response = {
			'categories': categories,
			'pieces': Piece._values(),
			'products': Product.list(),
			'current_path': request.path,
			'debugging': app.config['DEBUG'],
			'stripe_key': app.config['STRIPE_PUBLISHABLE_KEY']
		}
		response['pieces_json'] = json.dumps(response['pieces'], sort_keys=False, default=json_formater)
		response['categories_json'] = json.dumps(response['categories'], sort_keys=False, default=json_formater)

		render = render_template('pages/' + request.endpoint + '.html', **response)
		app.caches['/pages'].set(request.path, render, timeout=0)
		return render

	else:
		return cached_template


app.caches['/pages'] = SimpleCache()
for file in os.listdir(os.getcwd()+'/saturdays/templates/pages'):
	

	if file == 'index.html':
		pass
		# app.add_url_rule('/', 'index', methods=['GET'])
		# app.view_functions['index'] = page

	else:
		route = file.replace('.html', '')
		app.add_url_rule('/' + route, route, methods=['GET'])
		app.view_functions[route] = page

		




