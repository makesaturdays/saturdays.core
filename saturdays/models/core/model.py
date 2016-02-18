from saturdays import app
from flask import request

from bson.objectid import ObjectId
from datetime import datetime



with app.app_context():
	class Model():

		collection_name = 'models'
		collection_projection = {}
		collection_filter = {}
		collection_sort = []

		alternate_index = 'route'


		@classmethod
		def preprocess(cls, document):
			return document


		@classmethod
		def postprocess(cls, document):
			return document



		@classmethod
		def list(cls, document_filter={}, projection={}, limit=0, skip=0, sort=None):
			if sort is None:
				sort = cls.collection_sort

			return [cls.postprocess(document) for document in app.mongo.db[cls.collection_name].find(cls._merge_filters(document_filter), cls._merge_projections(projection), limit=limit, skip=skip, sort=sort)]



		@classmethod
		def count(cls, document_filter={}):

			return app.mongo.db[cls.collection_name].count(cls._merge_filters(document_filter))




		@classmethod
		def get(cls, _id, projection={}):
			if ObjectId.is_valid(_id):
				return cls.get_where({'_id': ObjectId(_id)}, projection)

			else:
				return cls.get_where({cls.alternate_index: _id}, projection)



		@classmethod
		def get_where(cls, document_filter, projection={}):

			return cls.postprocess(app.mongo.db[cls.collection_name].find_one_or_404(cls._merge_filters(document_filter), cls._merge_projections(projection)))



		@classmethod
		def create(cls, document):
			document = cls.preprocess(document)
			document['created_at'] = datetime.utcnow()

			document['_id'] = app.mongo.db[cls.collection_name].insert(document)


			return {'_id': document['_id']}




		@classmethod
		def update(cls, _id, document, other_operators={}, projection={}):

			return cls.update_where({'_id': ObjectId(_id)}, document, projection=projection, other_operators=other_operators)
			



		@classmethod
		def update_where(cls, document_filter, document, projection={}, multiple=False, other_operators={}):

			document = cls.preprocess(document)
			document['updated_at'] = datetime.utcnow()

			document_set = other_operators
			document_set['$set'] = document

			if not multiple:
				document = app.mongo.db[cls.collection_name].find_one_and_update(cls._merge_filters(document_filter), update=document_set, projection=cls._merge_projections(projection), new=True)
				if document is None:
					document = {}
				return cls.postprocess(document)

			else:
				return [cls.postprocess(document) for document in app.mongo.db[cls.collection_name].update(cls._merge_filters(document_filter), document_set, projection=cls._merge_projections(projection), multi=True)]






		@classmethod
		def delete(cls, _id):

			cls.update_where({'_id': ObjectId(_id)}, {'deleted': True})


			return {'_id': _id}





		# HELPERS
		@classmethod
		def _merge_filters(cls, document_filter):

			merged_filters = cls.collection_filter.copy()
			merged_filters.update(document_filter)
			merged_filters.update({'deleted': {'$ne': True}})

			return merged_filters



		@classmethod
		def _merge_projections(cls, projection):

			merged_projections = cls.collection_projection.copy()
			merged_projections.update(projection)

			if merged_projections == {}:
				merged_projections = None


			return merged_projections





