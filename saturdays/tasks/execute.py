from saturdays import app
from saturdays import celery
from flask import request, abort, json

from pybars import Compiler
import requests
# from mandrill import Mandrill


@celery.task(name='execute_task')
def execute_task(task, data={}):

	ctx = app.test_request_context()
	ctx.push()

	compiler = Compiler()

	try:
		if task['needs_users']:
			from saturdays.models.auth.user import User
			data['users'] = User.list()
	except KeyError:
		pass

	try:
		if task['needs_products']:
			from saturdays.models.ecom.product import Product
			data['products'] = Product.list()
	except KeyError:
		pass

	try:
		if task['needs_orders']:
			from saturdays.models.ecom.order import Order
			data['orders'] = Order.list()
	except KeyError:
		pass

	try:
		if task['needs_subscriptions']:
			from saturdays.models.ecom.subscription import Subscription
			data['subscriptions'] = Subscription.list()
	except KeyError:
		pass

	try:
		if task['has_email']:
			subject_template = compiler.compile(task['email_subject'])
			recipients_template = compiler.compile(task['email_to'])
			
			mandrill = Mandrill(app.config['MANDRILL_API_KEY'])
			body_template = compiler.compile(mandrill.templates.info(name=task['email_template'])['code'])


			message = mandrill.messages.send(
				message={
					'from_email': app.config['MANDRILL_FROM_EMAIL'],
					'from_name': app.config['MANDRILL_FROM_NAME'],
					'subject': subject_template(data),
					'html': body_template(data),
					'inline_css': True,
					'to': [{'email': recipients_template(data), 'type': 'to'}]
				},
				async=False
			)

			print(message)

			# body_template = compiler.compile(task['email_body'])

			# message = Message(subject_template(data),
			# 	sender=sender_template(data),
			# 	recipients=recipients_template(data).split(','))
			# message.html = body_template(data)

			# app.mail.send(message)

	except KeyError:
		pass

	try:
		if task['has_webhook']:
			body_template = compiler.compile(task['webhook_body'])

			response = requests.request(task['webhook_method'].lower(), task['webhook_url'], data=body_template(data), headers=task['webhook_headers'])
			

	except KeyError:
		pass
