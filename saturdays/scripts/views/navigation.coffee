
class Saturdays.Views.Navigation extends Saturdays.View



	events: {
		"click [data-show-cart]": "show_cart"
	}


	initialize: ->

		super()


	render: ->

		super()



	show_cart: (e)->
		Saturdays.cart_view.show(e)

