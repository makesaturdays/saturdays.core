from saturdays import app
from saturdays.helpers.json import to_json
from flask import request, abort

from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes

from saturdays.helpers.validation_rules import validation_rules



with app.app_context():
	class Survey(HasRoutes, Model):

		collection_name = 'surveys'

		schema = {
			'name': validation_rules['text'],
			'questions': {
				'type': 'list',
				'schema': {
					'type': 'dict',
					'schema': {
						'key': validation_rules['text'],
						'label': validation_rules['text'],
						'metadata': validation_rules['metadata']
					}
				},
			},
			'metadata': validation_rules['metadata']
		}


		endpoint = '/surveys'
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
		def postprocess(cls, document):

			try:
				counts = {}

				for question in document['questions']:
					counts[question['key']] = {}

				for answer_list in document['answers']:
					try:
						for answer in answer_list['answers']:
							try:
								counts[answer['question_key']][answer['value']] += 1

							except KeyError:
								try:
									counts[answer['question_key']][answer['value']] = 1

								except KeyError:
									pass

					except KeyError:
						pass

				for question in document['questions']:
					question['answers'] = counts[question['key']]


			except(KeyError, TypeError):
				pass

			return document





