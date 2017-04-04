
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop

from saturdays import app
from saturdays.helpers.json import to_json
from saturdays.pages.pages import page


from flask import request, abort, redirect
import os


from saturdays.models.utilities.upload import Upload
from saturdays.models.utilities.search import Search

Upload.define_routes()
Search.define_routes()


from saturdays.models.auth.token import Token
from saturdays.models.auth.session import Session
from saturdays.models.auth.user import User

Token.define_routes()
Session.define_routes()
User.define_routes()


from saturdays.models.content.piece import Piece
from saturdays.models.content.author import Author
from saturdays.models.content.list import List
from saturdays.models.content.list_post import ListPost
from saturdays.models.content.comment import ListPostComment
from saturdays.models.content.error import Error
from saturdays.models.content.survey import Survey
from saturdays.models.content.survey_answer import SurveyAnswer
from saturdays.models.content.comment import SurveyComment

Piece.define_routes()
Author.define_routes()
List.define_routes()
ListPost.define_routes()
ListPostComment.define_routes()
Error.define_routes()
Survey.define_routes()
SurveyAnswer.define_routes()
SurveyComment.define_routes()


from saturdays.models.commerce.product import Product
from saturdays.models.commerce.product_option import ProductOption
from saturdays.models.content.comment import ProductComment
from saturdays.models.commerce.discount import Discount
from saturdays.models.commerce.order import Order
from saturdays.models.commerce.cart import Cart
from saturdays.models.commerce.cart_item import CartItem
from saturdays.models.commerce.cart_item import UserCartItem
from saturdays.models.commerce.promotion import Promotion
from saturdays.models.commerce.address import Address
from saturdays.models.commerce.credit_card import CreditCard
from saturdays.models.commerce.credit_update import CreditUpdate
# from saturdays.models.commerce.plan import Plan
# from saturdays.models.content.comment import PlanComment
# from saturdays.models.commerce.subscription import Subscription
# from saturdays.models.commerce.cart_item import SubscriptionItem
from saturdays.models.commerce.vendor_shop import VendorShop
from saturdays.models.content.comment import VendorShopComment
from saturdays.models.commerce.taxe_rule import TaxeRule
from saturdays.models.commerce.shipping_option import ShippingOption

Product.define_routes()
ProductOption.define_routes()
ProductComment.define_routes()
Discount.define_routes()
Order.define_routes()
Cart.define_routes()
CartItem.define_routes()
UserCartItem.define_routes()
Promotion.define_routes()
Address.define_routes()
CreditCard.define_routes()
CreditUpdate.define_routes()
# Plan.define_routes()
# PlanComment.define_routes()
# Subscription.define_routes()
# SubscriptionItem.define_routes()
VendorShop.define_routes()
VendorShopComment.define_routes()
TaxeRule.define_routes()
ShippingOption.define_routes()


from saturdays.models.freelancers.freelancer import Freelancer

Freelancer.define_routes()


from saturdays.models.tasks.scheduled import ScheduledTask
from saturdays.models.tasks.triggered import TriggeredTask

ScheduledTask.define_routes()
TriggeredTask.define_routes()


@app.route('/')
def index():
	if request.host == 'availablenotavailable.com':
		query = request.query_string.decode('utf-8')
		if query == '':
			return redirect('/freelancers')
		else: 
			return redirect('/freelancers?'+query)
	else:
		return page()


@app.route('/<string:route>')
def available_short_route(route):
	if request.host == 'avail.es':
		return redirect('https://availablenotavailable.com/freelancers/' + route)
	else:
		abort(404)



if __name__ == '__main__':
	if app.config['DEBUG']:
		app.run(threaded=True, port=8080)

	else:
		http_server = HTTPServer(WSGIContainer(app))
		http_server.listen(5000)
		IOLoop.instance().start()

