from saturdays import app
from flask import request, abort

from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes

from saturdays.helpers.validation_rules import validation_rules





with app.app_context():
	class Promotion(HasRoutes, Model):

		collection_name = 'promotions'

		schema = {
			'name': validation_rules['text'],
			'code': validation_rules['text'],
			'products_tag': validation_rules['text'],
			'discount_value': validation_rules['number'],
			'has_fixed_discount_value': validation_rules['bool'],
			'does_free_shipping': validation_rules['bool'],
			'min_cart_sub_total': validation_rules['number'],
			'is_online': validation_rules['bool'],
			'metadata': validation_rules['metadata']
		}

		endpoint = '/promotions'
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
		def preprocess(cls, document):

			try:
				document['code'] = document['code'].upper().strip()
			except KeyError:
				pass

			return super().preprocess(document)


