
class Saturdays.Views.Cart extends Saturdays.View

	el: $("#cart")
	template: templates["ecom/cart"]

	events: {
		"input [name='quantity']": "input_quantity"
		"click [data-remove-from-cart]": "remove_from_cart"
	}


	initialize: ->
		this.listenTo Saturdays.cart, "sync", this.render if Saturdays.cart?

		super()


	render: ->

		_.extend @data,
			cart: Saturdays.cart.toJSON()
			

		super()


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




