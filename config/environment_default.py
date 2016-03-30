import os

# DEBUG
DEBUG = os.getenv('DEBUG', 'True')
if DEBUG.lower() == 'true':
	DEBUG = True

elif DEBUG.lower() == 'false':
	DEBUG = False


# MONGODB				 
MONGO_URI = 				os.getenv('MONGO_URI', 'mongodb://127.0.0.1:27017/database')


# STRIPE
STRIPE_API_KEY = 			os.getenv('STRIPE_API_KEY', 'sk_test_RaELUxUxG1GEL6UzKzoT8Xty')
STRIPE_CLIENT_ID = 			os.getenv('STRIPE_CLIENT_ID', 'ca_7g3yiDWNt1sCNsEkc8hhm9mzpK4BhVVH')


# S3
# S3_ACCESS_KEY = os.getenv('S3_ACCESS_KEY', '')
# S3_SECRET_KEY = os.getenv('S3_SECRET_KEY', '')
# S3_BUCKET = os.getenv('S3_BUCKET', '')
MAX_CONTENT_LENGTH = 16 * 1024 * 1024

# CELERY
# CELERY_BROKER_URL =			os.getenv('CELERY_BROKER_URL', 		'redis://')
# CELERY_RESULT_BACKEND =		os.getenv('CELERY_RESULT_BACKEND', 	'redis://')
# CELERY_ACCEPT_CONTENT =		['pickle']
# CELERY_TASK_SERIALIZER = 	'pickle'
# CELERY_RESULT_SERIALIZER = 	'pickle'
# CELERY_TIMEZONE = 			'UTC'



# XERO
# XERO_KEY = os.getenv('XERO_KEY', '')
# XERO_SECRET = os.getenv('XERO_SECRET', '')
# XERO_PRIVATE_KEY_PATH = os.getenv('XERO_PRIVATE_KEY_PATH', os.path.abspath(os.path.dirname(__file__))+'/keys/xero.pem)







# Email
# MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.sendgrid.net')
# MAIL_PORT = os.getenv('MAIL_PORT', 465)
# MAIL_USE_SSL = os.getenv('MAIL_USE_SSL', True)
# MAIL_USERNAME = os.getenv('MAIL_USERNAME', '')
# MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', '')



