from saturdays import app
from flask import request, abort

from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes
from saturdays.models.core.with_templates import WithTemplates

from saturdays.helpers.validation_rules import validation_rules



with app.app_context():
	class Product(WithTemplates, HasRoutes, Model):

		collection_name = 'products'
		alternate_index = 'pretty_url'

		schema = {
			'name': validation_rules['text'],
			'sku': validation_rules['text'],
			'price': validation_rules['number'],
			'description': validation_rules['text'],
			'inventory': validation_rules['int'],
			'thumbnail': validation_rules['image'],
			'image': validation_rules['image'],
			'extra_images': validation_rules['image_list'],
			'pretty_url': validation_rules['text'],
			'is_taxable': validation_rules['bool'],
			'is_salable': validation_rules['bool'],
			'is_online': validation_rules['bool'],
			'requires_shipping': validation_rules['bool'],
			'order': validation_rules['int'],
			'tags': validation_rules['text_list'],
			'metadata': validation_rules['metadata']
		}

		endpoint = '/products'
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
				'requires_vendor': True
			},
			{
				'route': '/<ObjectId:_id>',
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
				'requires_vendor': True
			}
		]

		templates = [
			{
				'view_function': 'list_view',
				'template': 'products/products.html',
				'response_key': 'products'
			},
			{
				'view_function': 'get_view',
				'template': 'products/product.html',
				'response_key': 'product'
			}
		]


		@classmethod
		def create(cls, document):

			document = cls._update_discount(document)
			return super().create(document)



		@classmethod
		def update(cls, id, document, other_operators={}, projection={}):

			document = cls._update_discount(document)
			if 'discount' not in document:
				super().update(id, {}, other_operators={
					'$unset': {'discount': None}
				})
			

			return super().update(id, document, other_operators, projection)



		@classmethod
		def postprocess(cls, document):

			try:
				from saturdays.models.ecom.product_option import ProductOption
				
				for option in document['options']:
					if 'discount' in document:
						option['discount'] = document['discount']
					option = ProductOption.postprocess(option)

			except KeyError:
				pass


			if 'discount' in document:
				if document['discount']['has_fixed_value']:
					document['discounted_price'] = document['price'] - document['discount']['value']
				else:
					document['discounted_price'] = document['price'] - (document['price'] * document['discount']['value'])


				document['discounted_price'] = round(document['discounted_price'], 2)


			document['price'] = round(document['price'], 2)
			return document




		@classmethod
		def _update_discount(cls, document):
			try:
				from saturdays.models.ecom.discount import Discount
				discounts = Discount.list({'is_online': True})

				for tag in document['tags']:
					for discount in discounts:
						if discount['products_tag'] == tag:
							document['discount'] = discount

							break

					if 'discount' in document:
						break

			except KeyError:
				pass


			return document




			