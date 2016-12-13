from saturdays import app

from dateutil import parser
from markdown import markdown

from config.categories import categories

import urllib

@app.template_filter('date')
def date_filter(date, format='%b %d, %Y'):
	if isinstance(date, str):
		date = parser.parse(date)
	
	return date.strftime(format) 


@app.template_filter('percentage')
def percentage_filter(number):
	return '%d%%' % (number * 100)

@app.template_filter('url')
def url_filter(url):
	if not url.startswith('http'):
		return 'http://'+url
	else:
		return url

@app.template_filter('markdown')
def markdown_filter(content):
	return markdown(content)


@app.template_filter('tag')
def tag_filter(tag):

	for category in categories:
		for t in category['tags']:
			if tag == t['key']:
				return t['title']

	return None

