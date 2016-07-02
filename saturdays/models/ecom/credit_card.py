from saturdays import app
from flask import request, abort

from saturdays.models.core.child_model import ChildModel
from saturdays.models.core.has_child_routes import HasChildRoutes

from saturdays.helpers.validation_rules import validation_rules


from saturdays.models.auth.user import User

from bson.objectid import ObjectId
import stripe


with app.app_context():
	class CreditCard(HasChildRoutes, ChildModel):

		parent = User
		list_name = 'credit_cards'

		schema = validation_rules['credit_card']['schema']

		endpoint = '/credit_cards'
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


		@classmethod
		def preprocess(cls, document):


			try:
				document['brand'] = document['provider_data']['brand']
				document['exp_month'] = document['provider_data']['exp_month']
				document['exp_year'] = document['provider_data']['exp_year']
				document['last4'] = document['provider_data']['last4']

			except KeyError:
				pass


			return super().preprocess(document)


		@classmethod
		def create(cls, parent_id, document):


			user = User.get(parent_id)

			document['_id'] = ObjectId()


			stripe.api_key = app.config['STRIPE_API_KEY']
			customer = stripe.Customer.retrieve(user['provider_data']['id'])
			document['provider_data'] = customer.sources.create(
				source=document['card_token'],
				metadata={'_id': document['_id']}
			)


			return super().create(parent_id, document)


