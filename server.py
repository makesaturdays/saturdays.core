
from tornado.wsgi import WSGIContainer
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop

from saturdays import app
from saturdays.helpers.json import to_json


from flask import request, abort
import os


from saturdays.models.core.upload import Upload
Upload.define_routes()


from saturdays.models.auth.token import Token
from saturdays.models.auth.session import Session
from saturdays.models.auth.user import User

Token.define_routes()
Session.define_routes()
User.define_routes()


from saturdays.models.cms.piece import Piece
from saturdays.models.cms.author import Author
from saturdays.models.cms.list import List
from saturdays.models.cms.list_post import ListPost
from saturdays.models.cms.comment import ListPostComment
from saturdays.models.cms.survey import Survey
from saturdays.models.cms.survey_answer import SurveyAnswer
from saturdays.models.cms.comment import SurveyComment

Piece.define_routes()
Author.define_routes()
List.define_routes()
ListPost.define_routes()
ListPostComment.define_routes()
Survey.define_routes()
SurveyAnswer.define_routes()
SurveyComment.define_routes()


from saturdays.models.ecom.product import Product
from saturdays.models.ecom.product_option import ProductOption
from saturdays.models.cms.comment import ProductComment
from saturdays.models.ecom.discount import Discount
from saturdays.models.ecom.order import Order
from saturdays.models.ecom.cart import Cart
from saturdays.models.ecom.cart_item import CartItem
from saturdays.models.ecom.cart_item import UserCartItem
from saturdays.models.ecom.promotion import Promotion
from saturdays.models.ecom.address import Address
from saturdays.models.ecom.credit_card import CreditCard
from saturdays.models.ecom.credit_update import CreditUpdate
# from saturdays.models.ecom.plan import Plan
# from saturdays.models.cms.comment import PlanComment
# from saturdays.models.ecom.subscription import Subscription
# from saturdays.models.ecom.cart_item import SubscriptionItem
from saturdays.models.ecom.vendor_shop import VendorShop
from saturdays.models.cms.comment import VendorShopComment
from saturdays.models.ecom.taxe_rule import TaxeRule
from saturdays.models.ecom.shipping_option import ShippingOption

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


from saturdays.models.tasks.scheduled import ScheduledTask
from saturdays.models.tasks.triggered import TriggeredTask

ScheduledTask.define_routes()
TriggeredTask.define_routes()




if __name__ == '__main__':
	if app.config['DEBUG']:
		app.run(threaded=True)

	else:
		http_server = HTTPServer(WSGIContainer(app))
		http_server.listen(5000)
		IOLoop.instance().start()

