from saturdays import app
from flask import request, abort

from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes

from saturdays.helpers.validation_rules import validation_rules





with app.app_context():
	class Plan(HasRoutes, Model):

		collection_name = 'plans'

		schema = {
			'name': validation_rules['text'],
			'description': validation_rules['text'],
			'interval': validation_rules['interval'],
			'interval_count': validation_rules['int'],
			'interval_day':	validation_rules['day'],
			'thumbnail': validation_rules['image'],
			'image': validation_rules['image'],
			'is_online': validation_rules['bool'],
			'order': validation_rules['int'],
			'metadata': validation_rules['metadata']
		}

		endpoint = '/plans'
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



