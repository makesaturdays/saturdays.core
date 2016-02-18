from saturdays import app
from flask import request, abort

from saturdays.models.core.child_model import ChildModel
from saturdays.models.core.has_child_routes import HasChildRoutes

from saturdays.helpers.validation_rules import validation_rules

from saturdays.models.auth.user import User



with app.app_context():
	class Address(HasChildRoutes, ChildModel):

		parent = User
		list_name = 'addresses'

		schema = validation_rules['address']['schema']

		endpoint = '/addresses'
		routes = [
			{
				'route': '',
				'view_function': 'list_view',
				'methods': ['GET'],
				'requires_user': True
			},
			{
				'route': '',
				'view_function': 'create_view',
				'methods': ['POST'],
				'requires_user': True
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'get_view',
				'methods': ['GET'],
				'requires_user': True
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'update_view',
				'methods': ['PATCH', 'PUT'],
				'requires_user': True
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'delete_view',
				'methods': ['DELETE'],
				'requires_user': True
			}
		]









