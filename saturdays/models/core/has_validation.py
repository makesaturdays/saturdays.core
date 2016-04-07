from saturdays import app
from flask import request, abort

from saturdays.helpers.validator import Validator

from bson.objectid import ObjectId
from dateutil import parser


with app.app_context():
	class HasValidation():

		schema = {}


		@classmethod
		def validate(cls, document):

			for key in list(document.keys()):
				if key not in cls.schema:
					del document[key]

				try:
					if cls.schema[key]['type'] == 'datetime':
						document[key] = parser.parse(document[key])

					elif cls.schema[key]['type'] == 'object_id':
						document[key] = ObjectId(document[key])

				except KeyError:
					pass


			validator = Validator(
				schema=cls.schema
			)

			if not validator.validate(document):
				print(validator.errors)
				abort(400)

			return document