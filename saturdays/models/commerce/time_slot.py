from saturdays import app
from flask import request, abort

from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes

from saturdays.helpers.validation_rules import validation_rules





with app.app_context():
	class TimeSlot(HasRoutes, Model):

		collection_name = 'time_slots'

		schema = {
			'name': validation_rules['text'],
			'description': validation_rules['text'],
			'frequency': validation_rules['frequency'],
			'frequency_interval': validation_rules['int'],
			'frequency_day': validation_rules['day'],
			'frequency_hour': validation_rules['hour'],
			'frequency_minute': validation_rules['minute'],
			'is_online': validation_rules['bool'],
			'metadata': validation_rules['metadata']
		}

		endpoint = '/time_slots'
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



