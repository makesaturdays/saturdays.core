
from saturdays import app
from saturdays.helpers.json import to_json, json_formater
from saturdays.models.cms.piece import Piece

from flask import request, abort
from flask import render_template, json

import os



def page():
	response = {}
	response['pieces'] = Piece._values()
	response['pieces_json'] = json.dumps(response['pieces'], sort_keys=False, default=json_formater)


	if request.path == '/':
		request.path = '/index' 
	return render_template('pages' + request.path + '.html', **response)


for file in os.listdir(os.getcwd()+'/saturdays/templates/pages'):
	

	if file == 'index.html':
		app.add_url_rule('/', 'index', methods=['GET'])
		app.view_functions['index'] = page

	else:
		route = file.replace('.html', '')
		app.add_url_rule('/' + route, route, methods=['GET'])
		app.view_functions[route] = page

		




