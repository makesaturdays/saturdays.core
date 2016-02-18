import os



# MONGODB				 
MONGO_URI = 				os.getenv('MONGO_URI', 'mongodb://127.0.0.1:27017/database')
MONGO_DBNAME =				os.getenv('MONGO_DBNAME', 'database')

# STRIPE
STRIPE_API_KEY = 			os.getenv('STRIPE_API_KEY', 'sk_test_RaELUxUxG1GEL6UzKzoT8Xty')
STRIPE_CLIENT_ID = 			os.getenv('STRIPE_CLIENT_ID', 'ca_7g3yiDWNt1sCNsEkc8hhm9mzpK4BhVVH')


