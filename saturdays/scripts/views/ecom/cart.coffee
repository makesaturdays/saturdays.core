
class Saturdays.Views.Cart extends Saturdays.View

	el: $("#cart")
	template: templates["ecom/cart"]

	events: {
		"input [name='quantity']": "input_quantity"
		"click [data-remove-from-cart]": "remove_from_cart"
		"change [name='with_store_credit']": "change_store_credit"
		"input [name='email']": "input_email"
		"submit [data-credit-card-form]": "submit_credit_card_form"
		"click [data-hide-cart]": "hide"
	}


	initialize: ->
		Stripe.setPublishableKey(Saturdays.settings["stripe_key"])
		this.listenTo Saturdays.cart, "change", this.render if Saturdays.cart?

		super()


	render: ->

		_.extend @data,
			cart: Saturdays.cart.toJSON()
			
		super()


		$("[name='number']").payment('formatCardNumber')
		$("[name='expiry']").payment('formatCardExpiry')
		$("[name='cvc']").payment('formatCardCVC')


		this


	input_quantity: (e)->
		if e.currentTarget.value
			e.currentTarget.setAttribute "disabled", "disabled"

			Saturdays.cart.update_quantity e.currentTarget.getAttribute("data-item-id"), e.currentTarget.value,
				success: (model, response)->
					e.currentTarget.removeAttribute "disabled"

				error: (model, response)->
					e.currentTarget.removeAttribute "disabled"


	remove_from_cart: (e)->
		e.currentTarget.setAttribute "disabled", "disabled"

		Saturdays.cart.remove_from_cart e.currentTarget.getAttribute("data-item-id"),
			success: (model, response)->
				# e.currentTarget.removeAttribute "disabled"

			error: (model, response)->
				e.currentTarget.removeAttribute "disabled"


	change_store_credit: (e)->
		e.currentTarget.setAttribute "disabled", "disabled"

		Saturdays.cart.save
			with_store_credit: e.currentTarget.checked
		,
			patch: true
			success: (model, response)->
				# e.currentTarget.removeAttribute "disabled"

			error: (model, response)->
				e.currentTarget.removeAttribute "disabled"


	input_email: (e)->
		regex = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$", "g")
		if regex.test(e.currentTarget.value)
			window.clearTimeout(@email_timeout)
			@email_timeout = window.setTimeout ->
				Saturdays.cart.save
					email: e.currentTarget.value
				,
					patch: true
					silent: true

			, 1000



	submit_credit_card_form: (e)->
		e.preventDefault()

		form = e.currentTarget
		$(form).find("[type='submit']").attr "disabled", "disabled"

		
		credit_card = new Saturdays.Models.CreditCard
			parent: Saturdays.user if Saturdays.user.id?

		credit_card.save 
			number: form["number"].value
			expiry: form["expiry"].value
			cvc: parseInt form["cvc"].value
			billing_street: form["billing_street"].value
			billing_zip: form["billing_zip"].value
		, 
			success: (model, response)->

				Saturdays.cart.save 
					credit_card: model.toJSON()
				, 
					success: (model, response)->
						order = new Saturdays.Models.Order()
						console.log order
						order.save {
							cart_id: Saturdays.cart.id unless Saturdays.user.id?,
							user_id: Saturdays.user.id if Saturdays.user.id?
						}, 
							success: (model, response)->

								Saturdays.cookies.delete("Cart-Id") 
								Saturdays.cart.clear()



		, not Saturdays.user.id?


	show: (e)->
		if e?
			e.preventDefault()
			Saturdays.router.navigate window.location.pathname+"?cart=true"

		this.$el.removeClass "fade_out"


	hide: (e)->
		if e?
			e.preventDefault()
			Saturdays.router.navigate e.currentTarget.getAttribute("href")

		this.$el.addClass "fade_out"
			



