
from saturdays import app
from saturdays.models.core.has_routes import HasRoutes

from flask import request

from bson.objectid import ObjectId
from werkzeug import secure_filename

import boto
import mimetypes




with app.app_context():
	class Upload(HasRoutes):

		endpoint = '/_upload'
		routes = [
			{
				'route': '',
				'view_function': 'upload_view',
				'methods': ['POST'],
				'requires_vendor': True
			}
		]


		@classmethod
		def upload_view(cls):
			uploaded_file = request.files['file']

			filename = secure_filename(uploaded_file.filename)
			_id = str(ObjectId())

			connection = boto.connect_s3(app.config['S3_ACCESS_KEY'], app.config['S3_SECRET_KEY'])
			bucket = connection.get_bucket(app.config['S3_BUCKET'])

			key = bucket.new_key('uploads/' + _id + '/' + filename)
			key.set_contents_from_file(uploaded_file, headers={'Content-Type': mimetypes.guess_type(filename)[0]}, policy='public-read')


			return cls._format_response({
				'url': 'uploads/'+_id+'/'+filename,
				'file_name': filename
			})






