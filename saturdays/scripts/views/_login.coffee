
class Saturdays.Views.Login extends Saturdays.Views.Slider

	el: $("#login")
	template: templates["user/login"]

	events: {
		"submit [data-login-form]": "submit_login"
		"submit [data-signup-form]": "submit_signup"
		"submit [data-forgot-password-form]": "submit_forgot_password"
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


	submit_signup: (e)->
		e.preventDefault()

		tags = []
		$(e.currentTarget).find("[data-tags] [type='checkbox']:checked").each (index, input)->
			tags.push input.name

		freelancer = new Saturdays.Models.Freelancer()
		freelancer.save {
			email: e.currentTarget["email"].value
			first_name: e.currentTarget["first_name"].value
			last_name: e.currentTarget["last_name"].value
			tags: tags
		}, 
			success: (model, response)=>
				Saturdays.user.set
					is_freelancer: true

				this.render()
				this.slide_to(null, 0)


	submit_forgot_password: (e)->
		e.preventDefault()

		token = new Saturdays.Models.Token()
		token.save {
			email: e.currentTarget["email"].value
		},
			success: (model, response)=>
				this.$el.find("[data-success]").html "<span class='highlight'>A request was sent to your email address.</span>"



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
			
			
			



