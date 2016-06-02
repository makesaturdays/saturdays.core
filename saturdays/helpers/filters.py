
from saturdays import app
from dateutil import parser


@app.template_filter('date')
def date_filter(date, format='%b %d, %Y'):
	if isinstance(date, str):
		date = parser.parse(date)
	
	return date.strftime(format) 