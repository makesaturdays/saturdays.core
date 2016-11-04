
from saturdays import app
from flask import request, abort

from saturdays.helpers.json import to_json
from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes
from saturdays.models.core.with_templates import WithTemplates

from saturdays.models.ecom.cart import Cart

from saturdays.helpers.validation_rules import validation_rules
from saturdays.tasks.trigger import trigger_tasks

from bson.objectid import ObjectId

import stripe

import string
import random
import hashlib
import uuid



with app.app_context():
	class User(WithTemplates, HasRoutes, Model):

		collection_name = 'users'
		collection_sort = [('updated_at', -1), ('created_at', -1)]

		schema = {
			'email': validation_rules['email'],
			'password': validation_rules['password'],
			'first_name': validation_rules['text'],
			'last_name': validation_rules['text'],
			# 'referral_id': validation_rules['text'],
			'notes': validation_rules['text'],
			'cart': {
				'type': 'dict',
				'schema': Cart.schema
			},
			'is_vendor': validation_rules['bool'],
			'is_admin': validation_rules['bool'],
			'metadata': validation_rules['metadata']
		}


		endpoint = '/users'
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
				'requires_admin': True
			},
			{
				'route': '/<ObjectId:_id>/cart',
				'view_function': 'get_cart_view',
				'methods': ['GET'],
				'requires_user': True
			},
			{
				'route': '/<ObjectId:_id>/cart',
				'view_function': 'update_cart_view',
				'methods': ['PATCH', 'PUT'],
				'requires_user': True
			},
			{
				'route': '/<ObjectId:_id>/profile',
				'view_function': 'profile_view',
				'methods': ['GET'],
				'requires_user': True
			}
		]

		templates = [
			{
				'view_function': 'profile_view',
				'template': 'users/user.html',
				'response_key': 'user'
			}
		]



		@classmethod
		def create(cls, document):


			# document['order_count'] = 0
			# document['subscription_order_count'] = 0

			# document['referral_id'] = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(7))
			# document['referral_count'] = 0

			# document['referral_order_count'] = 0
			# document['referral_subscription_count'] = 0
			# document['referral_subscription_order_count'] = 0
			

			document['store_credit'] = 0
			document['_id'] = ObjectId()
			document['user_id'] = document['_id']


			stripe.api_key = app.config['STRIPE_API_KEY']
			document['provider_id'] = stripe.Customer.create(
				email=document['email'],
				metadata={'_id': document['_id']}
			)['id']


			document['cart'] = Cart.preprocess({'user_id': document['_id']})


			if 'password' not in document:
				document['password'] = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(9))
				document['password'] = '-'.join([document['password'][:3], document['password'][3:6], document['password'][6:]])
				has_generated_password = True

			else:
				has_generated_password = False


			trigger_tasks.apply_async(('user_created', {
				'user': document,
				'has_generated_password': has_generated_password
			}))


			return super().create(document)



		@classmethod
		def update(cls, _id, document, other_operators={}, projection={}):

			try:
				document['cart'] = Cart.preprocess(document['cart'])

			except KeyError:
				pass


			document = super().update(_id, document, other_operators, projection)


			trigger_tasks.apply_async(('user_updated', {
				'user': document
			}))


			return document




		@classmethod
		def preprocess(cls, document):

			if not request.current_session_is_admin:
				try:
					del document['is_admin']
				except KeyError:
					pass
				try:
					del document['is_vendor']
				except KeyError:
					pass
			
			try:
				document['password_salt'] = uuid.uuid4().hex
				document['password'] = hashlib.sha256(document['password'].encode('utf-8') + document['password_salt'].encode('utf-8')).hexdigest()
			except KeyError:
				del document['password_salt']
				
				pass

			return super().preprocess(document)



		@classmethod
		def postprocess(cls, document):

			try:
				document['cart']['available_store_credit'] = document['store_credit']
			except KeyError:
				pass
			
			try:
				document['cart']['items'] = document['cart_items']
				# del document['cart_items']
			except KeyError:
				pass

			document['cart'] = Cart.postprocess(document['cart'])
			document['cart']['requires_user'] = False

			try:
				if 'credit_card' not in document['cart']:
					document['cart']['credit_card'] = document['credit_cards'][0]
			except KeyError:
				pass

			try:
				del document['password']
				del document['password_salt']
			except KeyError:
				pass


			return document



		# VIEWS
		@classmethod
		def get_cart_view(cls, _id):
			document = cls.get(_id)

			try:
				return to_json(document['cart'])

			except KeyError:
				return to_json({})


		@classmethod
		def update_cart_view(cls, _id):
			document = Cart.preprocess(Cart.validate(cls._get_json_from_request()))

			for key in document.copy().keys():
				document['cart.'+key] = document.pop(key)

			return to_json(cls.update(_id, document)['cart'])


		@classmethod
		def profile_view(cls, _id):
			document = cls.get(_id)

			from saturdays.models.ecom.order import Order
			document['orders'] = Order.list({'user_id': document['_id']})

			return cls._format_response(document)









