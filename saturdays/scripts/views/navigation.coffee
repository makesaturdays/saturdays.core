
class Saturdays.Views.Navigation extends Saturdays.View


	user_nav_template: templates["user/nav"]

	events: {
		"click [data-show-cart]": "show_cart"
		"click [data-show-login]": "show_login"
		"click [data-show-signup]": "show_signup"
	}


	initialize: ->

		super()


	render: ->

		super()

		if @data.is_authenticated
			this.$el.find("[data-user-nav]").html this.user_nav_template(@data)

		this



	show_cart: (e)->
		Saturdays.cart_view.show(e)


	show_login: (e)->
		e.preventDefault()

		window.history.replaceState(null, null, location.pathname+"?login=true")
		Saturdays.login_view.show(e)


	show_signup: (e)->
		e.preventDefault()

		window.history.replaceState(null, null, location.pathname+"?signup=true")
		Saturdays.login_view.show(e, 1)

		
