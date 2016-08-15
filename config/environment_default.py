import os
from celery.schedules import crontab


ADMIN_EMAIL = 'phil@boeuf.coffee'
ADMINS = [ADMIN_EMAIL]
TIMEZONE = 'US/Eastern'
MAX_CONTENT_LENGTH = 16 * 1024 * 1024


# DEBUG
DEBUG = os.getenv('DEBUG', 'True')
if DEBUG.lower() == 'true':
	DEBUG = True

elif DEBUG.lower() == 'false':
	DEBUG = False


# MONGODB				 
MONGO_URI = os.getenv('MONGO_URI', 'mongodb://127.0.0.1:27017/database')


# STRIPE
STRIPE_API_KEY = os.getenv('STRIPE_API_KEY', 'sk_test_RaELUxUxG1GEL6UzKzoT8Xty')
STRIPE_CLIENT_ID = os.getenv('STRIPE_CLIENT_ID', 'ca_7g3yiDWNt1sCNsEkc8hhm9mzpK4BhVVH')
STRIPE_PUBLISHABLE_KEY = os.getenv('STRIPE_PUBLISHABLE_KEY', 'pk_test_2HjgvpC2f4FSLj90x9E6bOG9')


# Email
MANDRILL_API_KEY = os.getenv('MANDRILL_API_KEY', '')
MANDRILL_FROM_EMAIL = os.getenv('MANDRILL_FROM_EMAIL', 'makers@makes.at')
MANDRILL_FROM_NAME = os.getenv('MANDRILL_FROM_NAME', 'Make Saturdays')
# MAIL_SERVER = os.getenv('MAIL_SERVER', 'smtp.sendgrid.net')
# MAIL_PORT = os.getenv('MAIL_PORT', 465)
# MAIL_USE_SSL = os.getenv('MAIL_USE_SSL', True)
# MAIL_USERNAME = os.getenv('MAIL_USERNAME', '')
# MAIL_PASSWORD = os.getenv('MAIL_PASSWORD', '')


# S3
S3_ACCESS_KEY = os.getenv('S3_ACCESS_KEY', '')
S3_SECRET_KEY = os.getenv('S3_SECRET_KEY', '')
S3_BUCKET = os.getenv('S3_BUCKET', '')


# CELERY
CELERY_TIMEZONE = TIMEZONE
CELERY_BROKER_URL =	os.getenv('CELERY_BROKER_URL', 'redis://127.0.0.1:6379')
CELERY_RESULT_BACKEND =	os.getenv('CELERY_RESULT_BACKEND', 'redis://127.0.0.1:6379')
CELERYBEAT_SCHEDULE = {
    'subscriptions': {
        'task': 'subscriptions.charge',
        'schedule': crontab(minute=0, hour=0)
    },
    'scheduled': {
        'task': 'scheduled_tasks',
        'schedule': crontab(minute='*/1')
    }
}


# ELASTICSEARCH
ELASTICSEARCH_HOST = os.getenv('ELASTICSEARCH_HOST', 'localhost:443')
ELASTICSEARCH_USER = os.getenv('ELASTICSEARCH_USER', '')
ELASTICSEARCH_PASSWORD = os.getenv('ELASTICSEARCH_PASSWORD', '')


# XERO
# XERO_KEY = os.getenv('XERO_KEY', '')
# XERO_SECRET = os.getenv('XERO_SECRET', '')
# XERO_PRIVATE_KEY_PATH = os.getenv('XERO_PRIVATE_KEY_PATH', os.path.abspath(os.path.dirname(__file__))+'/keys/xero.pem)







