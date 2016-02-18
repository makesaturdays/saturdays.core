from flask import json
from flask import Response


from bson.objectid import ObjectId
from bson import json_util

from datetime import datetime



def to_json(document=None, code=200):
	return Response(
		json.dumps(document, sort_keys=False, default=json_formater),
		status=code,
		mimetype='application/json'
	)



def json_formater(obj):
	if isinstance(obj, ObjectId):
		return str(obj)

	if isinstance(obj, datetime):
		return obj.isoformat()
		

	return json_util.default(obj)