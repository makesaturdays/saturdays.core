
from saturdays import app
from dateutil import parser
from markdown import markdown

@app.template_filter('date')
def date_filter(date, format='%b %d, %Y'):
	if isinstance(date, str):
		date = parser.parse(date)
	
	return date.strftime(format) 


@app.template_filter('percentage')
def percentage_filter(number):
	return '%d%%' % (number * 100)


@app.template_filter('markdown')
def markdown_filter(content):
	return markdown(content)