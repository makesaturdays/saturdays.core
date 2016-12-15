
class Saturdays.Views.Navigation extends Saturdays.View



	events: {
		"click [data-show-cart]": "show_cart"
		"click [data-show-login]": "show_login"
		"click [data-show-signup]": "show_signup"
	}


	initialize: ->

		super()


	render: ->

		super()



	show_cart: (e)->
		Saturdays.cart_view.show(e)


	show_login: (e)->
		e.preventDefault()
		Saturdays.login_view.show(e)


	show_signup: (e)->
		e.preventDefault()
		Saturdays.login_view.show(e, 1)

		
