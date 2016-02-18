
from saturdays import app

@app.after_request
def set_access_control_allow_orgin(response):
	response.headers['Access-Control-Allow-Origin'] = '*'
	response.headers['Access-Control-Allow-Headers'] = 'Content-Type, X-Session-Secret'

	return response