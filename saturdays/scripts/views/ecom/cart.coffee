
class Saturdays.Views.Cart extends Saturdays.View

	el: $("#cart")
	template: templates["ecom/cart"]

	events: {

	}


	initialize: ->

		super()


	render: ->

		_.extend @data,
			cart: Saturdays.cart.toJSON()

		super()