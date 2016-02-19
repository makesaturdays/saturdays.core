from saturdays import app
from flask import request, abort

from bson.objectid import ObjectId
from datetime import datetime


from saturdays.models.core.model import Model


with app.app_context():
	class ChildModel(Model):

		parent = Model
		list_name = 'models'



		@classmethod
		def list(cls, parent_id, limit=0, skip=0, sort=None):

			try:
				return [cls.postprocess(document) for document in cls.parent.get(parent_id)[cls.list_name]]

			except KeyError:
				return []
			



		@classmethod
		def count(cls, parent_id):

			try:
				return len(cls.parent.get(parent_id)[cls.list_name])

			except KeyError:
				return 0
			




		@classmethod
		def get(cls, parent_id, _id, projection={}):

			try:
				parent = cls.parent.get(parent_id, projection=projection)
				for child in parent[cls.list_name]:
					if ObjectId.is_valid(_id):
						if child['_id'] == ObjectId(_id):
							child['parent'] = parent.copy()
							del child['parent'][cls.list_name]
							
							return cls.postprocess(child)

					else:
						if child[cls.alternate_index] == _id:
							child['parent'] = parent.copy()
							del child['parent'][cls.list_name]
							
							return cls.postprocess(child)

				abort(404)

			except KeyError:
				abort(404)




		@classmethod
		def create(cls, parent_id, document):
			document = cls.preprocess(document)
			document['created_at'] = datetime.utcnow()
			document['_id'] = ObjectId()

			cls.parent.update(parent_id, {}, other_operators={'$push': {cls.list_name: document}})

			return {'_id': document['_id']}




		@classmethod
		def update(cls, parent_id, _id, document, projection={}):

			document = cls.preprocess(document)
			document['updated_at'] = datetime.utcnow()

			for key in document.copy().keys():
				document[cls.list_name+'.$.'+key] = document.pop(key)


			try:
				for child in cls.parent.update_where({'_id': ObjectId(parent_id), cls.list_name: {'$elemMatch': {'_id': ObjectId(_id)}}}, document, projection=projection)[cls.list_name]:
					if child['_id'] == ObjectId(_id):
						return cls.postprocess(child)

				abort(404)

			except KeyError:
				abort(404)







		@classmethod
		def delete(cls, parent_id, _id):

			cls.parent.update(parent_id, {}, other_operators={'$pull': {cls.list_name: {'_id': ObjectId(_id)}}})


			return {'_id': _id}










