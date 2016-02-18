from saturdays import app
from flask import request, abort

from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes

from saturdays.helpers.validation_rules import validation_rules

from bson.objectid import ObjectId


import stripe



with app.app_context():
	class VendorLocation(HasRoutes, Model):

		collection_name = 'vendor_locations'

		schema = {
			'user_id': validation_rules['object_id'],
			'name': validation_rules['text'],
			'email': validation_rules['email'],
			'url': validation_rules['text'],
			'address': validation_rules['address'],
			'thumbnail': validation_rules['image'],
			'image': validation_rules['image'],
			'support_email': validation_rules['email'],
			'support_phone': validation_rules['text'],
			'support_url': validation_rules['text'],
			'metadata': validation_rules['metadata']
		}

		endpoint = '/vendor_locations'
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
				'requires_vendor': True
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



			document['_id'] = ObjectId()


			stripe.api_key = app.config['STRIPE_API_KEY']
			document['provider_data'] = stripe.Account.create(
				country=document['address']['country'],
				managed=False,
				email=document['email'],
				business_name=document['name'],
				business_url=document['url'] if 'url' in document else None,
				support_email=document['support_email'] if 'support_email' in document else None,
				support_phone=document['support_phone'] if 'support_phone' in document else None,
				support_url=document['support_url'] if 'support_url' in document else None,
				metadata={'_id': document['_id']}
			)


			return super().create(document)



