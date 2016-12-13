
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
				'template': 'freelancers/freelancers.html',
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

			# freelancers = [
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': 'hi@deluvio.com',
			# 	'first_name': 'Charles',
			# 	'last_name': 'Deluvio',
			# 	'route': 'deluvio',
			# 	'bio': 'Charles Deluvio is a graphic designer from Montréal.',
			# 	'rate': '$60–100',
			# 	'links': [{'label':'Portfolio', 'url':'deluvio.com'}],
			# 	'skills': ['Branding', 'Design Thinking', 'UX', 'UI'],
			# 	'tags': ['designer']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': 'info@kirillz.com',
			# 	'first_name': 'Kirill',
			# 	'last_name': 'Zakharov',
			# 	'route': 'kirillz',
			# 	'bio': 'Kirill Zakharov is a Montreal-based product designer. Currently building Unsplash at Crew.',
			# 	'rate': '--',
			# 	'links': [{'label':'Portfolio', 'url':'kirillz.com'}],
			# 	'skills': ['Branding', 'Web Development', 'UI', 'UX'],
			# 	'tags': ['designer']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': 'pepinvanessa@gmail.com',
			# 	'first_name': 'Vanessa',
			# 	'last_name': 'Pépin',
			# 	'route': 'pepin',
			# 	'bio': 'Basée à Montréal, Vanessa Pépin offre ses services de direction artistique et de design graphique à la pige depuis 2013. Elle se spécialise en identité de marque, direction artistique, typographie et design web.',
			# 	'rate': '--',
			# 	'links': [{'label':'Portfolio', 'url':'pepinvanessa.com'}],
			# 	'skills': ['Branding', 'Art Direction', 'Web Design'],
			# 	'tags': ['designer']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': 'info@wedge.work',
			# 	'first_name': 'Justin',
			# 	'last_name': 'Lortie',
			# 	'route': 'lortie',
			# 	'bio': '',
			# 	'rate': '--',
			# 	'links': [{'label':'Portfolio', 'url':'wedge.work'}],
			# 	'skills': [''],
			# 	'tags': ['designer']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': 'snvilgrain@gmail.com',
			# 	'first_name': 'Sacha-Nicholas',
			# 	'last_name': 'Vilgrain',
			# 	'route': 'sachanicholas',
			# 	'bio': 'Sacha-Nicholas is a designer, illustrator, and woodworker. He has collaborated with a few startups, restaurants, and independent shops.',
			# 	'rate': '--',
			# 	'links': [{'label':'Portfolio', 'url':'sachanicholas.com'}],
			# 	'skills': [''],
			# 	'tags': ['designer', 'illustrator', 'maker']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': 'at@amelietourangeau.com',
			# 	'first_name': 'Amélie',
			# 	'last_name': 'Tourangeau',
			# 	'route': 'tourangeau',
			# 	'bio': 'Amélie Tourangeau is a freelance illustrator, designer & animation director based in Montréal.',
			# 	'rate': '--',
			# 	'links': [{'label':'Portfolio', 'url':'amelietourangeau.com/'}],
			# 	'skills': [''],
			# 	'tags': ['designer', 'illustrator', 'animator']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': 'me@oliverchank.com',
			# 	'first_name': 'Oliver',
			# 	'last_name': 'Chank',
			# 	'route': 'chank',
			# 	'bio': 'Oliver Chank is a graphic designer.',
			# 	'rate': '--',
			# 	'links': [{'label':'Portfolio', 'url':'oliverchank.com/'}],
			# 	'skills': ['Branding', 'Art Direction', 'UX', 'UI'],
			# 	'tags': ['designer']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': 'pao.iannucci@gmail.com',
			# 	'first_name': 'Paola',
			# 	'last_name': 'Iannu',
			# 	'route': 'paolaiannu',
			# 	'bio': '',
			# 	'rate': '--',
			# 	'links': [{'label':'Portfolio', 'url':'https://www.behance.net/paolaiannucci'}],
			# 	'skills': ['Branding', 'Art Direction', 'Photography'],
			# 	'tags': ['designer', 'photographer']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': 'hola@rodrigosergio.com',
			# 	'first_name': 'Rodrigo',
			# 	'last_name': 'Sergio',
			# 	'route': 'rodrigosergio',
			# 	'bio': 'Rodrigo is a Graphic designer / Art Director based in Montréal, Québec, Canada.',
			# 	'rate': '--',
			# 	'links': [{'label':'Portfolio', 'url':'rodrigosergio.com/'}],
			# 	'skills': ['Branding', 'Art Direction'],
			# 	'tags': ['designer']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': 'maxkaplun@gmail.com',
			# 	'first_name': 'Max',
			# 	'last_name': 'Kaplun',
			# 	'route': 'maxkaplun',
			# 	'bio': 'Max is an award-winning graphic designer with over 8 years experience in various interactive, arts, lifestyle and music brand-focused projects. Hailing from Brooklyn, he holds a graphic design degree from the School of Visual Arts. He\'s currently a Senior Art Director at Dynamo in Montreal, Canada.',
			# 	'rate': '--',
			# 	'links': [{'label':'Portfolio', 'url':'maxkaplun.com/'}],
			# 	'skills': ['Branding', 'Art Direction', 'Web Design', 'UI', 'UX'],
			# 	'tags': ['designer']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': 'hello@beckii.com',
			# 	'first_name': 'Bex',
			# 	'last_name': 'Adel',
			# 	'route': 'beckii',
			# 	'bio': 'Beckii is the creator of unique interfaces, intuitive user experiences, and custom iconography. Armed with an iterative process, a robust toolkit, and the flexibility to adapt to changing technologies and systems. She is currently working at Dynamo.',
			# 	'rate': '--',
			# 	'links': [{'label':'Portfolio', 'url':'beckii.com/'}],
			# 	'skills': ['UI', 'UX', 'Mobile Design'],
			# 	'tags': ['designer']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': 'bonjour@asaumierdemers.com ',
			# 	'first_name': 'Alexandre',
			# 	'last_name': 'Saumier Demers',
			# 	'route': 'asaumierdemers',
			# 	'bio': 'Type designer with a programming influence, a background in graphic design and a passion for cycling. Co-founder of Coppers & Brasses with Étienne Aubert Bonn, a type foundry established in Montréal. Recently graduated in graphic design at Université du Québec à Montréal and currently studying in Type and Media at The Royal Academy of Art, The Hague in The Netherlands.',
			# 	'rate': '--',
			# 	'links': [{'label':'Portfolio', 'url':'asaumierdemers.com/'}],
			# 	'skills': ['Type', 'Design', 'Sign Painting'],
			# 	'tags': ['designer', 'typographer']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': 'patricedidier@hotmail.com',
			# 	'first_name': 'Patrice',
			# 	'last_name': 'Didier',
			# 	'route': 'patricedidier',
			# 	'bio': '',
			# 	'rate': '--',
			# 	'links': [{'label':'Portfolio', 'url':'ruefullum.com/'}],
			# 	'skills': ['Branding', 'Art Direction', 'Packaging'],
			# 	'tags': ['designer']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': 'lian.benoit@gmail.com',
			# 	'first_name': 'Lian',
			# 	'last_name': 'Benoit',
			# 	'route': 'lianbenoit',
			# 	'bio': 'Hello! I likes to produce fun, unpredictable work that is supported by a clear underlying concept. I aim to rouse interest through design, coupling simplicity with an offbeat edge for a style that is cool and controlled. I enjoy experimenting with photography and illustration, integrating these elements with clean cut typography and layout.',
			# 	'rate': '--',
			# 	'links':[{'label':'Portfolio', 'url':'#'}],
			# 	'skills': [''],
			# 	'tags': ['']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': '',
			# 	'first_name': 'Charles',
			# 	'last_name': 'Fortier',
			# 	'route': '',
			# 	'bio': '',
			# 	'rate': '--',
			# 	'links':[{'label':'Portfolio', 'url':'#'}],
			# 	'skills': [''],
			# 	'tags': ['']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': '',
			# 	'first_name': 'Laurent',
			# 	'last_name': 'Laferrière',
			# 	'route': '',
			# 	'bio': '',
			# 	'rate': '--',
			# 	'links':[{'label':'Portfolio', 'url':'#'}],
			# 	'skills': [''],
			# 	'tags': ['']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': '',
			# 	'first_name': 'Alexandra',
			# 	'last_name': 'Nolot',
			# 	'route': '',
			# 	'bio': '',
			# 	'rate': '',
			# 	'links':[{'label':'Portfolio', 'url':'#'}],
			# 	'skills': [''],
			# 	'tags': ['']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': '',
			# 	'first_name': 'J.-S.',
			# 	'last_name': 'Chouinard',
			# 	'route': '',
			# 	'bio': '',
			# 	'rate': '',
			# 	'links':[{'label':'Portfolio', 'url':'#'}],
			# 	'skills': [''],
			# 	'tags': ['']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': '',
			# 	'first_name': 'Gabrielle',
			# 	'last_name': 'Madé',
			# 	'route': '',
			# 	'bio': '',
			# 	'rate': '',
			# 	'links':[{'label':'Portfolio', 'url':'#'}],
			# 	'skills': [''],
			# 	'tags': ['']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': 'hoso.tran@me.com',
			# 	'first_name': 'Hoang-Son',
			# 	'last_name': 'Tran',
			# 	'route': 'hoangsontran',
			# 	'bio': 'Allô, mon nom est Hoang‑Son et je suis un designer graphique de Montréal.',
			# 	'rate': '--',
			# 	'links': [{'label':'Portfolio', 'url':'hoangsontran.com/'}],
			# 	'skills': [''],
			# 	'tags': ['']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': '',
			# 	'first_name': 'Philippe',
			# 	'last_name': 'Gauthier',
			# 	'route': 'philippegauthier',
			# 	'bio': 'Associate Design Director at Character. ',
			# 	'rate': '--',
			# 	'links': [{'label':'Portfolio', 'url':'https://dribbble.com/philgauthier'}],
			# 	'skills': [''],
			# 	'tags': ['']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': '',
			# 	'first_name': 'Camille',
			# 	'last_name': 'Miron-Sauvé',
			# 	'route': 'camillemironsauve',
			# 	'bio': '',
			# 	'rate': '',
			# 	'links':[{'label':'Portfolio', 'url':'#'}],
			# 	'skills': [''],
			# 	'tags': ['']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': '',
			# 	'first_name': 'Edith',
			# 	'last_name': 'Morin',
			# 	'route': 'edithmorin',
			# 	'bio': '',
			# 	'rate': '',
			# 	'links':[{'label':'Portfolio', 'url':'#'}],
			# 	'skills': [''],
			# 	'tags': ['']
			# 	},
			# 	{
			# 	'is_available': True,
			# 	'is_online': True,
			# 	'email': '',
			# 	'first_name': 'Kevin',
			# 	'last_name': 'Clark',
			# 	'route': 'kevinclark',
			# 	'bio': '',
			# 	'rate': '',
			# 	'links':[{'label':'Portfolio', 'url':'#'}],
			# 	'skills': [''],
			# 	'tags': ['']
			# 	}
			# ]

			# for freelancer in freelancers:
			# 	cls.create(freelancer)


			document_filter['is_online'] = True
			documents = super().list(document_filter, projection, limit, skip, sort)

			random.shuffle(documents)

			return documents


		@classmethod
		def postprocess(cls, document):

			
			if 'image' not in document:
				document['image'] = 'http://fillmurray.com/800/800'

			return super().postprocess(document)



		# VIEWS

		@classmethod
		def tagged_view(cls, tag):
			limit = int(request.args.get('limit', 0))
			skip = int(request.args.get('skip', 0))

			return cls._format_response({
				'tag': tag,
				'freelancers': cls.list({'tags': tag, 'is_online': True}, limit=limit, skip=skip)
			})


