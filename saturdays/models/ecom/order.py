from saturdays import app
from flask import request, abort

from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes

from saturdays.helpers.validation_rules import validation_rules


from saturdays.models.auth.user import User
from saturdays.models.ecom.cart import Cart
from saturdays.models.ecom.cart_item import UserCartItem
from saturdays.models.ecom.product import Product
from saturdays.models.ecom.product_option import ProductOption
from saturdays.models.ecom.vendor_location import VendorLocation
from saturdays.models.ecom.credit_update import CreditUpdate

from bson.objectid import ObjectId

import stripe



with app.app_context():
	class Order(HasRoutes, Model):

		collection_name = 'orders'

		schema = {
			'user_id': validation_rules['object_id'],
			'cart': {
				'type': 'dict',
				'schema': Cart.schema
			},
			'vendor_location_id': validation_rules['object_id'],
			'metadata': validation_rules['metadata']
		}

		endpoint = '/orders'
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
				'requires_session': True
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
				'requires_vendor': True
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'delete_view',
				'methods': ['DELETE'],
				'requires_vendor': True
			}
		]



		@classmethod
		def create(cls, document):



			if 'user_id' in document:
				user = User.get(document['user_id'])
				document['user_id'] = ObjectId(document['user_id'])

				if 'cart' not in document:
					document['cart'] = user['cart']

			else:
				if 'cart' not in document:
					abort(400)

				else:
					document['cart'] = Cart.postprocess(Cart.preprocess(document['cart']))


			if 'vendor_id' in document:
				vendor = Vendor.get(document['vendor_id'])
				document['vendor_id'] = ObjectId(document['vendor_id'])


			try:
				del document['cart']['updated_at']
			except KeyError:
				pass

			try:
				document['cart']['metadata'].update(document['metadata'])
			except KeyError:
				pass

			document.update(document['cart'])
			del document['cart']



			document['_id'] = ObjectId()


			if document['total'] != 0:
				stripe.api_key = app.config['STRIPE_API_KEY']

				stripe_customer = stripe.Customer.retrieve(user['provider_data']['id'])
				stripe_card = stripe_customer.sources.retrieve(document['credit_card']['provider_data']['id'])


				document['charge'] = stripe.Charge.create(
					amount=int(document['total']*100),
					currency='cad',
					customer=stripe_customer,
					source=stripe_card,
					destination=vendor['provider_data']['id'] if 'vendor_id' in document else None,
					application_fee=int(document['total']*10) if 'vendor_id' in document else None,
					metadata={'_id': document['_id']}
				)



			for item in document['items']:
				if 'option_id' in item:
					item['option'] = ProductOption.update(item['product']['_id'], item['option']['_id'], {
						'inventory': item['option']['inventory'] - item['quantity']
					})


				else:
					item['product'] = Product.update(item['product']['_id'], {
						'inventory': item['product']['inventory'] - item['quantity']
					})



			if user is not None:
				user = User.update(user['_id'], {}, other_operators={
					'$unset': {UserCartItem.list_name: None}
				})

				if document['store_credit_total'] > 0:
					CreditUpdate.create(user['_id'], {
						'value': -document['store_credit_total'],
						'description': 'order_id: ' + str(document['_id'])
					})


			return super().create(document)



