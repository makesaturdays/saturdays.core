
class Saturdays.Views.Login extends Saturdays.Views.Slider

	el: $("#login")
	template: templates["user/login"]

	events: {
		"submit [data-login-form]": "submit_login"
		"click [data-logout]": "logout"
	}


	initialize: ->
		$(document).on("keyup", this.check_escape)

		super()


	render: ->

		_.extend @data,
			categories: window.categories


		super()




		this




	submit_login: (e)->
		e.preventDefault()

		Saturdays.session.login({
			email: e.currentTarget["email"].value
			password: e.currentTarget["password"].value
		})


	logout: (e)->
		e.preventDefault() 

		Saturdays.session.logout()




	check_escape: (e)=>
		if e.keyCode == 27
			if this.$el.hasClass "fade_out"
				this.show()

			else
				this.hide()


	show: (e, index)->
		
		super(e, index)


	hide: (e)->
		
		window.history.replaceState(null, null, location.pathname)
		super(e)
			
			
			



