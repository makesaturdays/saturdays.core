from saturdays import app
from flask import request, abort

from saturdays.models.core.child_model import ChildModel
from saturdays.models.core.has_child_routes import HasChildRoutes

from saturdays.helpers.validation_rules import validation_rules


from saturdays.models.auth.user import User


with app.app_context():
	class CreditUpdate(HasChildRoutes, ChildModel):

		parent = User
		list_name = 'credit_updates'

		schema = {
			'value': validation_rules['number'],
			'description': validation_rules['text'],
			'metadata': validation_rules['metadata']
		}


		endpoint = '/credit_updates'
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
				'requires_admin': True
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'get_view',
				'methods': ['GET'],
				'requires_user': True
			}
		]



		@classmethod
		def create(cls, parent_id, document):


			user = User.update(parent_id, {}, other_operators={
				'$inc': {'store_credit': document['value']}
			})

			document['new_balance'] = user['store_credit']


			return super().create(parent_id, document)









