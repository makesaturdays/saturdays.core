from saturdays import app
from flask import request, abort

from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes
from saturdays.models.core.with_templates import WithTemplates

from saturdays.helpers.validation_rules import validation_rules



with app.app_context():
	class Author(WithTemplates, HasRoutes, Model):

		collection_name = 'authors'
		alternate_index = 'handle'

		schema = {
			'name': validation_rules['text'],
			'handle': validation_rules['text'],
			'metadata': validation_rules['metadata']
		}

		endpoint = '/authors'
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

		templates = [
			{
				'view_function': 'list_view',
				'template': 'authors/authors.html',
				'response_key': 'authors'
			},
			{
				'view_function': 'get_view',
				'template': 'authors/author.html',
				'response_key': 'author'
			}
		]





