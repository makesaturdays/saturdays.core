from saturdays import app
from flask import request, abort

from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes

from saturdays.helpers.validation_rules import validation_rules
from saturdays.helpers.json import to_json

import markdown


with app.app_context():
	class Piece(HasRoutes, Model):

		collection_name = 'pieces'

		schema = {
			'title': validation_rules['text'],
			'is_online': validation_rules['bool'],
			'content': validation_rules['content'],
			'metadata': validation_rules['metadata']
		}

		endpoint = '/pieces'
		routes = [
			{
				'route': '',
				'view_function': 'list_view',
				'methods': ['GET']
			},
			{
				'route': '',
				'view_function': 'create_view',
				'methods': ['POST'],
				'requires_admin': True
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'get_view',
				'methods': ['GET']
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'update_view',
				'methods': ['PATCH', 'PUT'],
				'requires_admin': True
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'delete_view',
				'methods': ['DELETE'],
				'requires_admin': True
			}
		]


		@classmethod
		def update(cls, _id, document, other_operators={}, projection={}):

			try:
				for key in document['content'].copy().keys():
					document['content.'+key] = document['content'].pop(key)

				del document['content']

			except KeyError:
				pass

			return super().update(_id, document, other_operators, projection)



		@classmethod
		def _values(cls):
			values = {}
			for document in cls.list():
				title = document['title'].lower().replace(' ', '').replace('&', '_').replace('#', '_')
				values[title] = document

				try:
					for (key, value) in document['content'].items():
						if 'is_markdown' in value and value['is_markdown']:
							values[title][key] = markdown.markdown(value['value'])
						else:
							values[title][key] = value['value']

					del values[title]['content']
				except KeyError:
					pass

				del values[title]['is_online']

			return values








