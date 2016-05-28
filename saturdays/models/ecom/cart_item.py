from saturdays import app
from flask import request, abort

from bson.objectid import ObjectId

from saturdays.models.core.child_model import ChildModel
from saturdays.models.core.has_child_routes import HasChildRoutes

from saturdays.helpers.validation_rules import validation_rules


from saturdays.models.auth.user import User
from saturdays.models.ecom.cart import Cart
from saturdays.models.ecom.product import Product
from saturdays.models.ecom.vendor_shop import VendorShop
from saturdays.models.ecom.subscription import Subscription


with app.app_context():
	class CartItem(HasChildRoutes, ChildModel):

		parent = Cart
		list_name = 'items'

		schema = {
			'product_id': validation_rules['object_id'],
			'option_id': validation_rules['object_id'],
			'quantity': validation_rules['int'].copy(),
			'metadata': validation_rules['metadata']
		}

		schema['quantity']['min'] = 0

		endpoint = '/items'


		@classmethod
		def create(cls, parent_id, document):
			document['product'] = Product.get(document['product_id'])
			document['product_id'] = ObjectId(document['product_id'])

			if document['product']['is_salable'] == False:
				abort(400)


			if 'option_id' in document and document['option_id'] is not None:
				document['option_id'] = ObjectId(document['option_id'])

				for option in document['product']['options']:
					if document['option_id'] == option['_id']:
						document['option'] = option

						document['name'] = document['product']['name']+' ('+option['name']+')'
						document['description'] = document['product']['description']+' ('+option['description']+')'
						document['sku'] = option['sku']
						document['price'] = option['price']

						try:
							document['thumbnail'] = option['thumbnail']
						except KeyError:
							pass

						break

			else:
				try:
					if len(document['product']['options']) > 0:
						abort(400)

				except KeyError:
					pass

				document['name'] = document['product']['name']
				document['description'] = document['product']['description']
				document['sku'] = document['product']['sku']
				document['price'] = document['product']['price']

				try:
					document['thumbnail'] = document['product']['thumbnail']
				except KeyError:
					pass



			try:
				if document['product']['vendor_shop_id'] is not None:
					document['vendor_shop'] = VendorShop.get(document['product']['vendor_shop_id'])
					document['vendor_shop']['provider_id'] = document['vendor_shop']['provider_data']['id']
					del document['vendor_shop']['provider_data']
					
			except KeyError:
				pass


			if 'quantity' not in document:
				document['quantity'] = 1


			return super().create(parent_id, document)



		@classmethod
		def update(cls, parent_id, _id, document, projection={}):
			try: 
				del document['product_id']
			except KeyError:
				pass

			try: 
				del document['option_id']
			except KeyError:
				pass

			document = super().update(parent_id, _id, document, projection)

			if document['quantity'] <= 0:
				cls.delete(parent_id, document['_id'])


			return document




		@classmethod
		def postprocess(cls, document, parent_id=None):
			document['sub_total'] = round(document['price'] * float(document['quantity']), 2)

			return document





	class UserCartItem(CartItem):

		parent = User
		list_name = 'cart_items'

		endpoint = '/cart/items'
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



	class SubscriptionItem(CartItem):

		parent = Subscription
		list_name = 'subscription_items'

		endpoint = '/items'
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








