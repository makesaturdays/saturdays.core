from saturdays import app
from saturdays.helpers.json import to_json

from flask import request, abort
from werkzeug.routing import Rule

from saturdays.models.core.has_routes import HasRoutes
from saturdays.models.core.model import Model


with app.app_context():
	class HasChildRoutes(HasRoutes):

		parent = Model

		endpoint = '/endpoint'
		routes = [
			{
				'route': '',
				'view_function': 'list_view',
				'methods': ['GET']
			},
			{
				'route': '',
				'view_function': 'create_view',
				'methods': ['POST']
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'get_view',
				'methods': ['GET']
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'update_view',
				'methods': ['PATCH', 'PUT']
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'delete_view',
				'methods': ['DELETE']
			}
		]



		@classmethod
		def define_routes(cls):
			for route in cls.routes:
				rule = Rule(cls.parent.endpoint + '/<string:parent_id>' + cls.endpoint + route['route'], endpoint=cls.parent.endpoint + cls.endpoint + '/' + route['view_function'], methods=route['methods'], strict_slashes=False)
				rule.route = route

				app.view_functions[cls.parent.endpoint + cls.endpoint + '/' + route['view_function']] = getattr(cls, route['view_function'])
				app.url_map.add(rule)

			return cls.routes



		@classmethod
		def list_view(cls, parent_id):
			return cls._format_response(cls.list(parent_id, {}))



		@classmethod
		def create_view(cls, parent_id):
			return cls._format_response(cls.create(parent_id, cls.validate(cls._get_json_from_request())))



		@classmethod
		def get_view(cls, parent_id, _id):
			return cls._format_response(cls.get(parent_id, _id))



		@classmethod
		def update_view(cls, parent_id, _id):
			return cls._format_response(cls.update(parent_id, _id, cls.validate(cls._get_json_from_request())))



		@classmethod
		def delete_view(cls, parent_id, _id):
			return cls._format_response(cls.delete(parent_id, _id))








