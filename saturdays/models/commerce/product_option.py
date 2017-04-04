from saturdays import app
from flask import request, abort

from saturdays.models.core.child_model import ChildModel
from saturdays.models.core.has_child_routes import HasChildRoutes

from saturdays.helpers.validation_rules import validation_rules

from saturdays.models.commerce.product import Product



with app.app_context():
	class ProductOption(HasChildRoutes, ChildModel):

		parent = Product
		list_name = 'options'

		schema = {
			'name': validation_rules['text'],
			'sku': validation_rules['text'],
			'price': validation_rules['number'],
			'description': validation_rules['text'],
			'inventory': validation_rules['int'],
			'thumbnail': validation_rules['image'],
			'image': validation_rules['image'],
			'metadata': validation_rules['metadata']
		}


		endpoint = '/options'
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


		@classmethod
		def postprocess(cls, document, parent_id):

			if 'discount' in document:
				if document['discount']['has_fixed_value']:
					document['discounted_price'] = document['price'] - document['discount']['value']
				else:
					document['discounted_price'] = document['price'] - (document['price'] * document['discount']['value'])

				document['discounted_price'] = round(document['discounted_price'], 2)

			document['price'] = round(document['price'], 2)

			return document





			