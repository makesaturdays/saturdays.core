
from flask import request, abort
from saturdays import app

from bson.objectid import ObjectId
import hashlib



@app.before_request
def verify_headers():
	if request.method != 'OPTIONS' and hasattr(request.url_rule, 'route'):
		try:
			request.requires_admin = request.url_rule.route['requires_admin']
		except KeyError:
			request.requires_admin = False

		try:
			request.requires_vendor = request.url_rule.route['requires_vendor']
		except KeyError:
			request.requires_vendor = False

		try:
			request.requires_user = request.url_rule.route['requires_user']
		except KeyError:
			request.requires_user = False

		try:
			request.requires_session = request.url_rule.route['requires_session']
		except KeyError:
			request.requires_session = False


		if request.requires_admin or request.requires_vendor or request.requires_user or request.requires_session:
			try:
				from saturdays.models.auth.session import Session
				request.current_session = Session.get_where({'secret_hash': hashlib.sha256(request.headers['X-Session-Secret'].encode('utf-8')).hexdigest()})

				if request.requires_admin and not request.current_session['is_admin']:
					abort(403)

				if request.requires_vendor and not request.current_session['is_vendor']:
					abort(403)

				if request.requires_user:
					if not request.current_session['user_id']:
						abort(403)


			except KeyError:
				abort(403)


