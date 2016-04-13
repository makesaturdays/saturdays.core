
from saturdays import app
from saturdays.models.core.has_routes import HasRoutes

from flask import request

from elasticsearch import Elasticsearch, Urllib3HttpConnection
import certifi


with app.app_context():
	class Search(HasRoutes):

		endpoint = '/_search'
		routes = [
			{
				'route': '',
				'view_function': 'results_view',
				'methods': ['GET'],
				'requires_admin': True
			}
		]


		@classmethod
		def results_view(cls):

			query = request.args.get('query', '')
			doc_type = request.args.get('type', None)

			results = app.search.search(index='saturdays', doc_type=doc_type, q=query+'*', size=15, analyze_wildcard=True)


			return cls._format_response({
				'query': query,
				'results': results['hits']['hits'],
				'max_score': results['hits']['max_score']
			})

