
class Saturdays.Views.Cart extends Saturdays.View

	el: $("#cart")
	template: templates["ecom/cart"]

	events: {

	}


	initialize: ->
		this.listenTo Saturdays.cart, "sync", this.render if Saturdays.cart?

		super()


	render: ->

		_.extend @data,
			cart: Saturdays.cart.toJSON()
			

		super()