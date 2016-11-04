
from flask import request, abort, make_response
from saturdays import app
from saturdays.helpers.raise_error import raise_error

from bson.objectid import ObjectId
import hashlib



@app.before_request
def verify_headers():
	from saturdays.models.auth.session import Session


	if request.method == 'OPTIONS':
		return make_response()

	elif hasattr(request.url_rule, 'route'):
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


		try:
			request.current_session = app.mongo.db[Session.collection_name].find_one_or_404({'_id': ObjectId(request.cookies['X-Session-Id'])})
			if request.current_session['secret_hash'] != hashlib.sha256(request.cookies['X-Session-Secret'].encode('utf-8') + request.current_session['secret_hash_salt'].encode('utf-8')).hexdigest():
				raise_error('auth', 'invalid_secret', 403)
		except KeyError:
			pass


		if request.requires_admin or request.requires_vendor or request.requires_user or request.requires_session:
			try:
				if hasattr(request, 'current_session'):
					try:
						if request.headers['X-Session-Secret'] != request.cookies['X-Session-Secret']:
							raise_error('auth', 'cookies_dont_match', 403)
					except KeyError:
						pass

				else:
					try:
						request.current_session = app.mongo.db[Session.collection_name].find_one_or_404({'_id': request.cookies['X-Session-Id']})
					except KeyError:
						raise_error('auth', 'missing_session_id', 403)
					
					if request.current_session['secret_hash'] != hashlib.sha256(request.cookies['X-Session-Secret'].encode('utf-8') + request.current_session['secret_hash_salt'].encode('utf-8')).hexdigest():
						raise_error('auth', 'invalid_secret', 403)
						

				if request.requires_admin and not request.current_session['is_admin']:
					raise_error('auth', 'requires_admin', 403)

				if request.requires_vendor and not request.current_session['is_admin'] and not request.current_session['is_vendor']:
					raise_error('auth', 'requires_vendor', 403)

				if request.requires_user:
					if not request.current_session['user_id']:
						raise_error('auth', 'requires_user', 403)


			except KeyError:
				raise_error('auth', 'missing_secret', 403)


		try: 
			request.current_session_is_admin = request.current_session['is_admin']
			request.current_session_is_vendor = request.current_session['is_vendor']
		except AttributeError:
			request.current_session_is_admin = False
			request.current_session_is_vendor = False


