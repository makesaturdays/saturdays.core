from saturdays import app
from saturdays.helpers.json import to_json

from flask import request, abort
from werkzeug.routing import Rule

from saturdays.models.core.has_validation import HasValidation

from bson.objectid import ObjectId
import hashlib

from datetime import datetime
from dateutil.relativedelta import relativedelta
from dateutil import parser
from pytz import timezone


with app.app_context():
	class HasRoutes(HasValidation):

		# endpoint = '/endpoint'
		# routes = [
		# 	{
		# 		'route': '',
		# 		'view_function': 'list_view',
		# 		'methods': ['GET']
		# 	},
		# 	{
		# 		'route': '',
		# 		'view_function': 'create_view',
		# 		'methods': ['POST']
		# 	},
		# 	{
		# 		'route': '/<ObjectId:_id>',
		# 		'view_function': 'get_view',
		# 		'methods': ['GET']
		# 	},
		# 	{
		# 		'route': '/<ObjectId:_id>',
		# 		'view_function': 'update_view',
		# 		'methods': ['PATCH', 'PUT']
		# 	},
		# 	{
		# 		'route': '/<ObjectId:_id>',
		# 		'view_function': 'delete_view',
		# 		'methods': ['DELETE'],
		# 		'requires_admin': True
			# },
			# {
			# 	'route': '/stats',
			# 	'view_function': 'stats_view',
			# 	'methods': ['GET'],
			# 	'requires_vendor': True
			# },
			# {
			# 	'route': '/_search',
			# 	'view_function': 'search_view',
			# 	'methods': ['GET']
			# }
		# ]



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

			limit = int(request.args.get('limit', 0))
			skip = int(request.args.get('skip', 0))

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


		@classmethod
		def search_view(cls):
			limit = int(request.args.get('limit', 15))
			query = request.args.get('query', '')

			if query:
				_results = app.search.search(index='saturdays', doc_type=cls.collection_name, q=cls._process_query(query)+'*', size=limit, analyze_wildcard=True)
				results = []
				for hit in _results['hits']['hits']:
					result = cls.postprocess(hit['_source'])
					result['_score'] = hit['_score']
					results.append(result)

				return cls._format_response({
						'query': query,
						'results': results,
						'results_length': len(results),
						'max_score': _results['hits']['max_score']
					})

			else:
				results = cls.list({}, limit=limit)
				return cls._format_response({
						'query': query,
						'results': results,
						'results_length': len(results)
					})


		@classmethod
		def stats_view(cls):

			_from = request.args.get('from', datetime.now(timezone(app.config['TIMEZONE'])) + relativedelta(months=-1))
			_to = request.args.get('to', datetime.now(timezone(app.config['TIMEZONE'])))

			if not isinstance(_from, datetime):
				_from = parser.parse(_from)

			if not isinstance(_to, datetime):
				_to = parser.parse(_to)
				

			documents = cls.list({'created_at': {
				'$gte': _from,
				'$lte': _to
			}})

			return cls._format_response(cls._process_stats({
					'from': _from,
					'to': _to,
					'length': len(documents)
				}, documents))






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


		# @classmethod
		# def _merge_filters(cls, document_filter):

		# 	merged_filters = super()._merge_filters(document_filter)

		# 	try:
		# 		if not request.current_session_is_admin:
		# 			if request.requires_user:
		# 				merged_filters.update({'user_id': request.current_session['user_id']})				

		# 			elif request.requires_session:
		# 				merged_filters.update({'session_id': request.current_session['_id']})

		# 	except AttributeError:
		# 		pass


		# 	print(merged_filters)

		# 	return merged_filters



		@classmethod
		def _process_stats(cls, stats, documents):
			return stats

		@classmethod
		def _process_query(cls, query):
			return query







