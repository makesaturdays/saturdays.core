class Saturdays.Models.Cart extends Saturdays.Model

	urlRoot: Saturdays.settings.api + "guest_carts"


	initialize: ->
		user_id = Saturdays.cookies.get("User-Id")
		cart_id = Saturdays.cookies.get("Cart-Id")

		if user_id?
			this.url = ->
				Saturdays.settings.api + "users/" + user_id + "/cart"

			this.isNew = ->
				false

			this.fetch()

		else if cart_id?
			this.set 
				_id: cart_id

			this.fetch()


		if this.isNew()
			this.save {},
				success: (model, response)=>
					Saturdays.cookies.set "Cart-Id", response._id
					Saturdays.cookies.set "Session-Secret", response.session.secret

					this.fetch()

		super()



	add_to_cart: (product_id, option_id=null, quantity=1, options={})->

		item = new Saturdays.Models.CartItem
			parent: this
		
		item.save 
			product_id: product_id
			quantity: quantity
			option_id: option_id
		, 
			success: (model, response)=>
				options.success(model, response) if options.success?
				this.fetch()

			error: (model, response)=>
				options.error(model, response) if options.error?





