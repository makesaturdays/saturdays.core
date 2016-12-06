
from saturdays import app
from flask import request, abort

from saturdays.helpers.json import to_json
from saturdays.models.auth.user import User

from saturdays.helpers.validation_rules import validation_rules
from saturdays.tasks.trigger import trigger_tasks

from bson.objectid import ObjectId

import string
import random
import hashlib
import uuid
import urllib



with app.app_context():
	class Freelancer(User):

		collection_name = 'freelancers'

		schema = {
			'email': validation_rules['email'],
			'password': validation_rules['password'],
			'route': validation_rules['text'],
			'image': validation_rules['text'],
			'first_name': validation_rules['text'],
			'last_name': validation_rules['text'],
			# 'tags': validation_rules['text_list'],
			'is_available': validation_rules['bool'],
			'rate': validation_rules['text'],
			'bio': validation_rules['text'],
			'links': validation_rules['link_list'],
			'skills': validation_rules['text_list'],
			'projects': {
				'type': 'list',
				'schema': {
					'type': 'dict',
					'schema': {
						'title': validation_rules['text'],
						'url': validation_rules['text'],
						'description': validation_rules['text'],
						'contributions': validation_rules['text'],
						'image': validation_rules['text']
					}
				}
			},
			'is_admin': validation_rules['bool'],
			'metadata': validation_rules['metadata']
		}


		endpoint = '/freelancers'
		routes = [
			{
				'route': '',
				'view_function': 'list_view',
				'methods': ['GET']
			},
			{
				'route': '',
				'view_function': 'create_view',
				'methods': ['POST']
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
				'requires_user': True
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'delete_view',
				'methods': ['DELETE'],
				'requires_admin': True
			},
			{
				'route': '/tagged/<string:tag>',
				'view_function': 'tagged_view',
				'methods': ['GET']
			}
		]

		templates = [
			{
				'view_function': 'list_view',
				'template': 'freelancers/freelancers.html',
				'response_key': 'freelancers'
			},
			{
				'view_function': 'tagged_view',
				'template': 'freelancers/tagged.html',
				'response_key': 'tagged'
			},
			{
				'view_function': 'get_view',
				'template': 'freelancers/freelancer.html',
				'response_key': 'freelancer'
			}
		]



		@classmethod
		def create(cls, document):

			document['is_online'] = False


			trigger_tasks.apply_async(('freelancer_created', {
				'freelancer': document,
				'has_generated_password': has_generated_password
			}))


			return super().create(document)





		@classmethod
		def preprocess(cls, document):


			try:
				document['route'] = urllib.parse.quote_plus(document['route'].lower())
			except KeyError:
				pass

			return super().preprocess(document)



		@classmethod
		def list(cls, document_filter={}, projection={}, limit=0, skip=0, sort=None):

			document_filter['is_online'] = True
			documents = super().list(document_filter, projection, limit, skip, sort)

			random.shuffle(documents)

			return documents



		# VIEWS

		@classmethod
		def tagged_view(cls, tag):
			limit = int(request.args.get('limit', 0))
			skip = int(request.args.get('skip', 0))

			return cls._format_response({
				'tag': tag,
				'freelancers': cls.list({'tags': tag, 'is_online': True}, limit=limit, skip=skip)
			})


