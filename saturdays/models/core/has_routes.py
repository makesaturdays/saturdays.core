from saturdays import app
from saturdays.helpers.json import to_json

from flask import request, abort
from werkzeug.routing import Rule

from saturdays.models.core.has_validation import HasValidation

from bson.objectid import ObjectId
import hashlib


with app.app_context():
	class HasRoutes(HasValidation):

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
				rule = Rule(cls.endpoint + route['route'], endpoint=cls.endpoint + '/' + route['view_function'], methods=route['methods'], strict_slashes=False)
				rule.route = route

				app.view_functions[cls.endpoint + '/' + route['view_function']] = getattr(cls, route['view_function'])
				app.url_map.add(rule)

			return cls.routes



		@classmethod
		def list_view(cls):
			if 'limit' in request.args:
				limit = int(request.args['limit'])

			else:
				limit = 0


			if 'skip' in request.args:
				skip = int(request.args['skip'])

			else:
				skip = 0
			

			return cls._format_response(cls.list({}, limit=limit, skip=skip))



		@classmethod
		def create_view(cls):
			return cls._format_response(cls.create(cls.validate(cls._get_json_from_request())))



		@classmethod
		def get_view(cls, _id):
			return cls._format_response(cls.get(_id))



		@classmethod
		def update_view(cls, _id):
			return cls._format_response(cls.update(_id, cls.validate(cls._get_json_from_request())))



		@classmethod
		def delete_view(cls, _id):
			return cls._format_response(cls.delete(_id))




		# HELPERS
		@classmethod
		def _get_json_from_request(cls):

			json = request.get_json()
			if json is None:
				json = {}


			return json


		@classmethod
		def _format_response(cls, data):
			return to_json(data)


		@classmethod
		def _merge_filters(cls, document_filter):

			merged_filters = super()._merge_filters(document_filter)

			try:
				if not request.current_session['is_admin']:
					if request.requires_user:
						merged_filters.update({'user_id': request.current_session['user_id']})				

					elif request.requires_session:
						merged_filters.update({'session_id': request.current_session['_id']})

			except AttributeError:
				pass


			return merged_filters







