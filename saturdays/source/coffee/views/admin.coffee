
class Saturdays.Views.Admin extends Saturdays.View

	el: $("#admin")
	template: templates["admin/admin"]

	events: {
		"submit .js-submit_login": "submit_login"
		"click .js-logout": "logout"
	}


	initialize: ->
		$(document).on("keyup", this.check_escape)

		super()


	render: ->
		super()




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
			this.$el.find(".js-login_box").toggleClass "hide"



