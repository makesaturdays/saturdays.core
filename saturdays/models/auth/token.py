from saturdays import app
from flask import request, abort
from werkzeug.exceptions import NotFound

from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes

from saturdays.helpers.validation_rules import validation_rules
from saturdays.helpers.raise_error import raise_error
from saturdays.tasks.trigger import trigger_tasks

from saturdays.models.auth.user import User

import string
import random
import uuid


with app.app_context():
	class Token(HasRoutes, Model):

		collection_name = 'tokens'

		endpoint = '/tokens'
		routes = [
			{
				'route': '',
				'view_function': 'list_view',
				'methods': ['GET'],
				'requires_admin': True
			},
			{
				'route': '',
				'view_function': 'create_view',
				'methods': ['POST']
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'get_view',
				'methods': ['GET'],
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

			try:
				user = User.get_where({
					'email': document['email']
				})
			except NotFound:
				raise_error('auth', 'user_not_found', 404)

			document['code'] = uuid.uuid4().hex
			document['user_id'] = user['_id']

			try:
				document['is_admin'] = user['is_admin']
			except KeyError:
				pass

			trigger_tasks.apply_async(('token_created', {
				'token': document,
				'user': user
			}))


			return super().create(document)


	



