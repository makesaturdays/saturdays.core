
from saturdays import app


@app.template_filter('date')
def date_filter(date):
    return date.strftime('%b %d, %Y') 