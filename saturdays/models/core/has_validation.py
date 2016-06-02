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
				if key not in cls.schema or document[key] is None:
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
				(document, errors) = cls._remove_unknown(document, validator.errors)
				if len(errors):
					from saturdays.helpers.raise_error import raise_error
					raise_error('validation', 'fields_invalid', code=400, fields=errors)

			return document


		# HELPERS
		@classmethod
		def _remove_unknown(cls, document, errors):

			for (key, value) in errors.copy().items():
				if isinstance(value, dict):
					(document[key], errors[key]) = cls._remove_unknown(document[key], errors[key])

					if len(errors[key]) == 0:
						del errors[key]

				else:
					if value == 'unknown field':
						del(document[key])
						del(errors[key])

			return (document, errors)


