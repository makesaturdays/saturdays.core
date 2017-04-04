from saturdays import app
from flask import request, abort

from saturdays.models.core.model import Model
from saturdays.models.core.with_templates import WithTemplates
from saturdays.models.core.has_routes import HasRoutes

from saturdays.helpers.validation_rules import validation_rules

from saturdays.models.commerce.product import Product


from bson.objectid import ObjectId

import stripe



with app.app_context():
	class VendorShop(WithTemplates, HasRoutes, Model):

		collection_name = 'vendor_shops'
		alternate_index = 'pretty_url'

		schema = {
			'vendor_ids': {
				'type': 'list',
				'schema': validation_rules['object_id']
			},
			'name': validation_rules['text'],
			'email': validation_rules['email'],
			'currency': validation_rules['currency'],
			'url': validation_rules['text'],
			'description': validation_rules['text'],
			'address': validation_rules['address'],
			'thumbnail': validation_rules['image'],
			'image': validation_rules['image'],
			'support_email': validation_rules['email'],
			'support_phone': validation_rules['text'],
			'support_url': validation_rules['text'],
			'pretty_url': validation_rules['text'],
			'metadata': validation_rules['metadata']
		}

		endpoint = '/vendor_shops'
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
				'route': '/<string:_id>',
				'view_function': 'get_view',
				'methods': ['GET']
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
				'requires_admin': True
			}
		]

		templates = [
			{
				'view_function': 'list_view',
				'template': 'vendors/shops.html',
				'response_key': 'shops'
			},
			{
				'view_function': 'get_view',
				'template': 'vendors/shop.html',
				'response_key': 'shop',
				'prerender_process': '_shop_products'
			}
		]


		@classmethod
		def create(cls, document):



			document['_id'] = ObjectId()


			stripe.api_key = app.config['STRIPE_API_KEY']
			document['provider_id'] = stripe.Account.create(
				country=document['address']['country'],
				managed=False,
				email=document['email'],
				business_name=document['name'],
				business_url=document['url'] if 'url' in document else None,
				support_email=document['support_email'] if 'support_email' in document else None,
				support_phone=document['support_phone'] if 'support_phone' in document else None,
				support_url=document['support_url'] if 'support_url' in document else None,
				metadata={'_id': document['_id']}
			)['id']


			return super().create(document)



		# HELPERS
		@classmethod
		def _shop_products(cls, response):
			response['products'] = Product.list({'vendor_shop_id': response['_id']})

			return response



