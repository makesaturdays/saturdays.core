from saturdays import app
from flask import request, abort

from saturdays.models.core.model import Model
from saturdays.models.core.has_routes import HasRoutes

from saturdays.helpers.validation_rules import validation_rules

from saturdays.models.ecom.taxe_rule import TaxeRule
from saturdays.models.ecom.shipping_option import ShippingOption
from saturdays.models.ecom.promotion import Promotion


from bson.objectid import ObjectId



with app.app_context():
	class Cart(HasRoutes, Model):

		collection_name = 'carts'

		schema = {
			'credit_card': validation_rules['credit_card'],
			'shipping_address': validation_rules['address'],
			'shipping_option_id': validation_rules['object_id'],
			'coupon_code': validation_rules['text'],
			'with_store_credit': validation_rules['bool'],
			'instructions':	validation_rules['text'],
			'metadata': validation_rules['metadata']
		}

		endpoint = '/guest_carts'
		routes = [
			{
				'route': '',
				'view_function': 'list_view',
				'methods': ['GET'],
				'requires_admin': True
			},
			{
				'route': '',
				'view_function': 'create_view',
				'methods': ['POST']
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'get_view',
				'methods': ['GET'],
				'requires_session': True
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'update_view',
				'methods': ['PATCH', 'PUT'],
				'requires_session': True
			},
			{
				'route': '/<ObjectId:_id>',
				'view_function': 'delete_view',
				'methods': ['DELETE'],
				'requires_admin': True
			}
		]


		@classmethod
		def preprocess(cls, document):

			try:
				document['taxes'] = TaxeRule.get_where({'region': document['shipping_address']['region']})['values']
				document['shipping_options'] = []
				shipping_options = ShippingOption.list()

				for option in shipping_options:
					if 'zip_regex' in option and option['zip_regex'] is not None:
						if re.match(option['zip_regex'].upper(), document['shipping_address']['zip'].upper()):
							document['shipping_options'].append(option)

					elif 'region' in option and option['region'] is not None:
						if option['region'] == document['shipping_address']['region']:
							document['shipping_options'].append(option)

					elif 'country' in option and option['country'] is not None:
						if option['country'] == document['shipping_address']['country']:
							document['shipping_options'].append(option)


			except KeyError:
				pass


			try:
				document['shipping_option_id'] = ObjectId(document['shipping_option_id'])

			except KeyError:
				pass


			try:
				document['coupon_code'] = document['coupon_code'].upper().strip()
				document['coupon'] = Promotion.get_where({'code': document['coupon_code'], 'is_online': True})

			except KeyError:
				pass


			return super().preprocess(document)



		@classmethod
		def postprocess(cls, document):
			from saturdays.models.ecom.cart_item import CartItem

			document['sub_total'] = 0
			document['total'] = 0

			if 'coupon' in document:
				document['coupon_total'] = 0

			
			document['requires_shipping'] = False

			try:
				document['items_total_quantity'] = 0
				vendor_shops = {}

				for item in document['items']:
					item = CartItem.postprocess(item, document['_id'])

					document['items_total_quantity'] += item['quantity']
					document['sub_total'] += item['sub_total']

					item['total'] = item['sub_total']
					if 'coupon' in document:
						item['coupon_total'] = round((item['sub_total'] * document['coupon']['discount_value']), 2)
						document['coupon_total'] += item['coupon_total']
						item['total'] -= item['coupon_total']

					document['total'] += item['total']


					try:
						vendor_shop_id = str(item['vendor_shop']['_id'])
						if vendor_shop_id not in vendor_shops.keys():
							vendor_shops[vendor_shop_id] = item['vendor_shop']
							vendor_shops[vendor_shop_id]['total'] = item['total']

						else:
							vendor_shops[vendor_shop_id]['total'] += item['total']

					except KeyError:
						pass


					try:
						if item['product']['requires_shipping'] == True:
							document['requires_shipping'] = True

					except KeyError:
						pass


			except KeyError:
				pass


			document['vendor_shops'] = []
			for (_id, vendor_shop) in vendor_shops.items():
				document['vendor_shops'].append(vendor_shop)


			try:
				for taxe in document['taxes']:
					taxe['total'] = 0

				document['taxes_total'] = 0


				for item in document['items']:
					if item['product']['is_taxable']:
						for taxe in document['taxes']:
							item_taxe = round(float(item['sub_total']) * float(taxe['value']), 2)

							taxe['total'] += item_taxe
							document['taxes_total'] += item_taxe
							document['total'] += item_taxe


			except KeyError:
				pass
				

			if document['requires_shipping']:
				document['shipping_total'] = 0
				
				if 'coupon' not in document or not document['coupon']['does_free_shipping']:
					try:
						for option in document['shipping_options']:
							if document['shipping_option_id'] == option['_id']:
								document['shipping_total'] += option['value']
								document['total'] += option['value']

								for taxe in document['taxes']:
									option_taxe = round(float(document['shipping_total']) * float(taxe['value']), 2)

									taxe['total'] += option_taxe
									document['taxes_total'] += option_taxe
									document['total'] += option_taxe

								break


					except KeyError:
						pass


			try:
				if document['with_store_credit']:
					document['store_credit_total'] = 0

					if document['total'] >= document['available_store_credit']:
						document['total'] = document['total'] - document['available_store_credit']
						document['store_credit_total'] = document['available_store_credit']

					else: 
						document['store_credit_total'] = document['total']
						document['total'] = 0


			except KeyError:
				document['with_store_credit'] = False


			return document




		@classmethod
		def create(cls, document):
			from saturdays.models.auth.session import Session
			session = Session.create({})

			document['session_id'] = session['_id']
			document = super().create(document)
			document['session'] = session

			return document



