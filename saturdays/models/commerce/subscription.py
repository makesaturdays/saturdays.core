from saturdays import app
from flask import request, abort

from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes

from saturdays.helpers.validation_rules import validation_rules
from saturdays.tasks.trigger import trigger_tasks

from saturdays.models.commerce.cart import Cart
from saturdays.models.commerce.plan import Plan



with app.app_context():
	class Subscription(Cart):

		collection_name = 'subscriptions'

		schema = {
			'user_id': validation_rules['object_id'],
			'plan_id': validation_rules['object_id'],
			'is_online': validation_rules['bool'],
			'is_skipped': validation_rules['bool'],
			'credit_card': validation_rules['credit_card'],
			'shipping_address': validation_rules['address'],
			'shipping_option_id': validation_rules['object_id'],
			'coupon_code': validation_rules['text'],
			'with_store_credit': validation_rules['bool'],
			'instructions':	validation_rules['text'],
			'metadata': validation_rules['metadata']
		}

		endpoint = '/subscriptions'
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
				'methods': ['POST']
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
				document['plan'] = Plan.get(document['plan_id'])
			except KeyError:
				pass

			return super().preprocess(document)



		@classmethod
		def create(cls, document):

			trigger_tasks.apply_async(('subscription_created', {
				'subscription': document
			}))

			return super().create(document)



		@classmethod
		def update(cls, _id, document, other_operators={}, projection={}):

			document = super().update(_id, document, other_operators, projection)


			trigger_tasks.apply_async(('subscription_updated', {
				'subscription': document
			}))


			return document



		@classmethod
		def postprocess(cls, document):

			document = super().postprocess(document)

			return document



