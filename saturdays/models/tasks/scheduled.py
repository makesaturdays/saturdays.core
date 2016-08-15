from saturdays import app
from flask import request, abort

from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes

from saturdays.helpers.validation_rules import validation_rules



with app.app_context():
	class ScheduledTask(HasRoutes, Model):


		collection_name = 'scheduled_tasks'

		schema = {
			'name': validation_rules['text'],
			'description': validation_rules['text'],
			'frequency': validation_rules['frequency'],
			'frequency_interval': validation_rules['int'],
			'frequency_day': validation_rules['day'],
			'frequency_hour': validation_rules['hour'],
			'frequency_minute': validation_rules['minute'],
			'is_online': validation_rules['bool'],
			'has_email': validation_rules['bool'],
			'email_to': validation_rules['email'],
			'email_subject': validation_rules['text'],
			'email_template': validation_rules['text'],
			'has_webhook': validation_rules['bool'],
			'webhook_method': validation_rules['method'],
			'webhook_url': validation_rules['text'],
			'webhook_body': validation_rules['text'],
			'webhook_headers': validation_rules['metadata'],
			'needs_users': validation_rules['bool'],
			'needs_products': validation_rules['bool'],
			'needs_orders': validation_rules['bool'],
			'needs_subscriptions': validation_rules['bool'],
			'metadata': validation_rules['metadata']
		}

		schema['frequency_interval']['min'] = 1


		endpoint = '/scheduled_tasks'
		routes = [
			{
				'route': '',
				'view_function': 'list_view',
				'methods': ['GET'],
				'requires_admin': True
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
				'methods': ['GET'],
				'requires_admin': True
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


