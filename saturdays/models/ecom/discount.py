from saturdays import app
from flask import request, abort

from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes

from saturdays.helpers.validation_rules import validation_rules

from saturdays.models.ecom.product import Product



with app.app_context():
	class Discount(HasRoutes, Model):

		collection_name = 'discounts'

		schema = {
			'name': validation_rules['text'],
			'products_tag': validation_rules['text'],
			'value': validation_rules['number'],
			'has_fixed_value': validation_rules['bool'],
			'is_online': validation_rules['bool'],
			'metadata': validation_rules['metadata']
		}

		endpoint = '/discounts'

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
				'route': '/<ObjectId:_id>',
				'view_function': 'get_view',
				'methods': ['GET']
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'update_view',
				'methods': ['PATCH', 'PUT'],
				'requires_admin': True
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'delete_view',
				'methods': ['DELETE'],
				'requires_admin': True
			}
		]



		@classmethod
		def create(cls, document):

			cls._discount_products(document)

			return super().create(document)



		@classmethod
		def update(cls, _id, document, other_operators={}, projection={}):

			document = super().update(_id, document, other_operators, projection)

			cls._discount_products(document)


			return document





		@classmethod
		def _discount_products(cls, document):
			try:
				if document['is_online']:
					Product.update_where({'tags': {'$in': [document['products_tag']]}}, {
						'discount': document
					})

				else:
					Product.update_where({'tags': {'$in': [document['products_tag']]}}, {}, other_operators={
						'$unset': {'discount': None}
					})

					discounts = cls.list()
					for discount in discounts:
						if discount['is_online']:
							Product.update_where({'tags': {'$in': [discount['products_tag']]}}, {
								'discount': discount
							})

			except KeyError:
				pass




