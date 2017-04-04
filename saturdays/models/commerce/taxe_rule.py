from saturdays import app
from flask import request, abort

from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes

from saturdays.helpers.validation_rules import validation_rules





with app.app_context():
	class TaxeRule(HasRoutes, Model):

		collection_name = 'taxe_rules'

		schema = {
			'name': validation_rules['text'],
			'country': validation_rules['text'],
			'region': validation_rules['text'],
			'values': validation_rules['values_list'],
			'metadata': validation_rules['metadata']
		}

		endpoint = '/taxe_rules'
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


