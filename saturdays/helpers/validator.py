from saturdays import app
from flask import request
from cerberus import Validator, errors

from bson import ObjectId

from collections import Mapping, Sequence


with app.app_context():
	class Validator(Validator):



		def _validate_type_object_id(self, field, value):
			try:
				return ObjectId(value)
			except:
				error(field, "Value '%s' cannot be converted to an ObjectId" % value)

