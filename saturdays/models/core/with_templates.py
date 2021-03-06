from saturdays import app
from saturdays.helpers.json import to_json, json_formater

from config.categories import categories

from flask import request, abort
from flask import render_template, json
from werkzeug.routing import Rule
from werkzeug.contrib.cache import SimpleCache

from bson.objectid import ObjectId
import hashlib


with app.app_context():
	class WithTemplates():

		templates = [
			{
				'view_function': 'list_view',
				'template': 'layout.html',
				'response_key': 'documents'
			},
			{
				'view_function': 'get_view',
				'template': 'layout.html',
				'response_key': 'document'
			}
		]

		@classmethod
		def define_routes(cls):
			app.caches[cls.endpoint] = SimpleCache()

			return super().define_routes()
		

		@classmethod
		def preprocess(cls, document):
			app.caches[cls.endpoint].clear()

			return super().preprocess(document)


		@classmethod
		def _format_response(cls, response):
			try:
				if 'application/json' in request.headers['Accept']:
					return to_json(response)
					
				else:
					cached_template = app.caches[cls.endpoint].get(request.path)
					if cached_template is None or 'query' in request.args or request.current_session_is_admin or app.config['DEBUG']:
						for template in cls.templates:
							if template['view_function'] == request.url_rule.route['view_function']:

								try:
									response = getattr(cls, template['prerender_process'])(response)
								except KeyError:
									pass


								from saturdays.models.cms.piece import Piece
								from saturdays.models.ecom.product import Product

								response = {
									template['response_key']: response.copy(),
									'categories': categories,
									'pieces': Piece._values(),
									'products': Product.list(),
									'debugging': app.config['DEBUG'],
									'current_path': request.path,
									'stripe_key': app.config['STRIPE_PUBLISHABLE_KEY']
								}
								response['pieces_json'] = json.dumps(response['pieces'], sort_keys=False, default=json_formater)
								response['categories_json'] = json.dumps(response['categories'], sort_keys=False, default=json_formater)

								template_name = template['template']
								try:
									template_name = template_name.replace('<route>', str(request.view_args['_id']))
								except KeyError:
									pass

								try:
									template_name = template_name.replace('<parent_route>', request.view_args['parent_id'])
								except KeyError:
									pass

								render = render_template(template_name, **response)
								if not request.current_session_is_admin:
									app.caches[cls.endpoint].set(request.path, render, timeout=0)
								
								return render

					else:
						return cached_template

			except KeyError:
				return to_json(response)
	







