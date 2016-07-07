
class Saturdays.Views.Cart extends Saturdays.Views.Slider


	el: $("#cart")
	template: templates["ecom/cart"]

	events: {
		"input [name='quantity']": "input_quantity"
		"click [data-remove-from-cart]": "remove_from_cart"
		"change [name='with_store_credit']": "change_store_credit"
		"input [name='email']": "input_email"
		"input [name='password']": "input_password"
		"submit [data-credit-card-form]": "submit_credit_card_form"
		"click [data-reset-credit-card-form]": "reset_credit_card_form"
		"click [data-create-order]": "create_order"
		"click [data-hide-cart]": "hide"
	}


	initialize: ->
		Stripe.setPublishableKey(Saturdays.settings["stripe_key"])
		this.listenTo Saturdays.cart, "change", this.render if Saturdays.cart?

		super()


	render: ->

		_.extend @data,
			cart: Saturdays.cart.toJSON()
			order: @order.toJSON() if @order?
			
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
			@email_timeout = window.setTimeout ()=>
				Saturdays.cart.save
					email: e.currentTarget.value
				,
					patch: true
					silent: true
					success: (model, response)=>
						if response.requires_user
							this.$el.find("[data-password-box]").removeClass "hide"
							this.$el.find("[data-credit-card-form]").attr "disabled", "disabled"
							this.$el.find("[data-credit-card-form] [type='submit']").attr "disabled", "disabled"
							this.$el.find("[name='password']").focus()

						else
							this.$el.find("[data-password-box]").addClass "hide"
							this.$el.find("[data-credit-card-form]").removeAttr "disabled"
							this.$el.find("[data-credit-card-form] [type='submit']").removeAttr "disabled"
				,
					Saturdays.cart.isNew()

			, 1000


	input_password: (e)->

		if e.currentTarget.value.length >= 8 and not this.$el.hasClass "fade_out"
			window.clearTimeout(@password_timeout)
			@password_timeout = window.setTimeout ()=>
				unless Saturdays.cart.isNew()
					Saturdays.session.login
						email: Saturdays.cart.get("email")
						password: e.currentTarget.value
						cart_id: Saturdays.cart.id

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
			success: (model, response)=>

				Saturdays.cart.save 
					credit_card: model.toJSON()
				,
					patch: true
					silent: true
					success: (model, response)=>
						this.create_order()

			error: (reponse)=>
				$(form).find("[type='submit']").removeAttr "disabled"


		, not Saturdays.user.id?


	reset_credit_card_form: (e)->
		Saturdays.cart.unset "credit_card"
		this.render()

		this.$el.find("[name='number']").focus()



	create_order: (e)->
		e.currentTarget.setAttribute "disabled", "disabled" if e?

		if Saturdays.cart.has "credit_card" or Saturdays.cart.get "total" == 0

			@order = new Saturdays.Models.Order()
			@order.save {
				cart_id: Saturdays.cart.id unless Saturdays.user.id?,
				user_id: Saturdays.user.id if Saturdays.user.id?
			}, 
				success: (model, response)=>

					this.render()
					this.next_slide()

					Saturdays.cookies.delete("Cart-Id") 
					Saturdays.cart.attributes = {}
					Saturdays.cart.id = undefined

					delete @order

 
				error: =>
					e.currentTarget.removeAttribute "disabled" if e?
		
		else
			$("[data-credit-card-form]").submit()





	show: (e)->
		if e?
			e.preventDefault()

		this.current_slide = 0
		this.render()
		
		Saturdays.router.navigate window.location.pathname+"?cart=true"
		this.$el.removeClass "fade_out"


	hide: (e)->
		if e?
			e.preventDefault()
		
		Saturdays.router.navigate window.location.pathname
		this.$el.addClass "fade_out"
			



