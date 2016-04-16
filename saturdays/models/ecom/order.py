from saturdays import app
from flask import request, abort

from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes

from saturdays.helpers.validation_rules import validation_rules
from saturdays.tasks.trigger import trigger_tasks

from saturdays.models.auth.user import User
from saturdays.models.ecom.cart import Cart
from saturdays.models.ecom.cart_item import UserCartItem
from saturdays.models.ecom.product import Product
from saturdays.models.ecom.product_option import ProductOption
from saturdays.models.ecom.vendor_shop import VendorShop
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
			},
			{
				'route': '/stats',
				'view_function': 'stats_view',
				'methods': ['GET'],
				'requires_vendor': True
			}
		]



		@classmethod
		def create(cls, document):


			if 'user_id' in document:
				user = User.get(document['user_id'])

				if 'cart' not in document:
					document['cart'] = user['cart']

			else:
				if 'cart' not in document:
					abort(400)

				else:
					document['cart'] = Cart.postprocess(Cart.preprocess(document['cart']))


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

				document['charges'] = []
				total_left = document['total']

				for vendor_shop in document['vendor_shops']:
					document['charges'].append(stripe.Charge.create(
						amount=int(vendor_shop['total']*100),
						currency='cad',
						customer=stripe_customer,
						source=stripe_card,
						destination=vendor_shop['provider_id'],
						application_fee=int(vendor_shop['total']*10),
						metadata={'order_id': document['_id']}
					))

					total_left -= vendor_shop['total']

				if total_left > 0:
					document['charges'].append(stripe.Charge.create(
						amount=int(total_left*100),
						currency='cad',
						customer=stripe_customer,
						source=stripe_card,
						metadata={'order_id': document['_id']}
					))



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

				try:
					if document['store_credit_total'] > 0:
						CreditUpdate.create(user['_id'], {
							'value': -document['store_credit_total'],
							'description': 'order_id: ' + str(document['_id'])
						})

				except KeyError:
					pass



			trigger_tasks.apply_async(('order_created', {
				'user': user,
				'order': document
			}))


			return super().create(document)




		# HELPERS
		@classmethod
		def _process_stats(cls, stats, documents):

			items = {}

			stats['total'] = 0
			for document in documents:
				stats['total'] += document['total']

				try:
					for item in document['items']:
						if item['sku'] not in items:
							items[item['sku']] = item.copy()
							items[item['sku']]['ordered_sub_total'] = item['sub_total']
							items[item['sku']]['ordered_total'] = item['total']
							items[item['sku']]['ordered_quantity'] = item['quantity']
							
							del items[item['sku']]['quantity']
							del items[item['sku']]['sub_total']
							del items[item['sku']]['total']
							del items[item['sku']]['product']
							try:
								del items[item['sku']]['option']
							except KeyError:
								pass

						else:
							items[item['sku']]['ordered_sub_total'] += item['sub_total']
							items[item['sku']]['ordered_total'] += item['total']
							items[item['sku']]['ordered_quantity'] += item['quantity']

				except KeyError:
					pass


			stats['items'] = []
			for sku in items:
				stats['items'].append(items[sku])

			stats['items'] = sorted(stats['items'], key=lambda k: k['ordered_total'], reverse=True)


			return stats





