from saturdays import app
from flask import request, abort

from saturdays.helpers.json import to_json
from saturdays.models.core.child_model import ChildModel
from saturdays.models.core.has_child_routes import HasChildRoutes
from saturdays.models.core.with_templates import WithTemplates

from saturdays.helpers.validation_rules import validation_rules

from saturdays.models.cms.list import List
from saturdays.models.cms.author import Author

from bson.objectid import ObjectId
import markdown


with app.app_context():
	class ListPost(WithTemplates, HasChildRoutes, ChildModel):

		parent = List
		list_name = 'posts'

		schema = {
			'title': validation_rules['text'],
			'route': validation_rules['text'],
			'thumbnail': validation_rules['image'],
			'image': validation_rules['image'],
			'content': validation_rules['content'],
			'tags': validation_rules['text_list'],
			'authors': {
				'type': 'list',
				'schema': validation_rules['object_id']
			},
			'published_date': validation_rules['datetime'],
			'is_online': validation_rules['bool'],
			'metadata': validation_rules['metadata']
		}

		endpoint = '/posts'
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
				'route': '/<_id>',
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


		templates = [
			{
				'view_function': 'get_view',
				'template': 'lists/<parent_route>.post.html',
				'response_key': 'post',
				'prerender_process': '_response_values'
			}
		]



		@classmethod
		def preprocess(cls, document):

			try:
				document['authors'] = list(map(ObjectId, document['authors']))

			except KeyError:
				pass

			return super().preprocess(document)


		@classmethod
		def update(cls, parent_id, _id, document, projection={}):

			try:
				for key in document['content'].copy().keys():
					document['content.'+key] = document['content'].pop(key)


				del document['content']

			except KeyError:
				pass



			return super().update(parent_id, _id, document, projection)



		@classmethod
		def create(cls, parent_id, document):
			parent_list = List.get(parent_id)

			try:
				parent_list['template']['content'].update(document['content'])
				document['content'] = parent_list['template']['content']

			except KeyError:
				try:
					document['content'] = parent_list['template']['content']

				except KeyError:
					pass


			return super().create(parent_id, document)



		@classmethod
		def _response_values(cls, response):
						
			authors = Author.list()

			try:
				post_authors = []

				for post_author in response['authors']:
					for author in authors:
						if author['_id'] == post_author:
							post_authors.append(author)
							break

				response['author_ids'] = response['authors']
				response['authors'] = post_authors

			except KeyError:
				pass



			try:
				for (key, value) in response['content'].items():
					if 'is_markdown' in value and value['is_markdown']:
						response[key] = markdown.markdown(value['value'])
					else:
						response[key] = value['value']
				del response['content']

			except KeyError:
				pass

			del response['is_online']
				

			return response






