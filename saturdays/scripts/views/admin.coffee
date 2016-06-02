
class Saturdays.Views.Admin extends Saturdays.View

	el: $("#admin")
	template: templates["admin/admin"]

	events: {
		"submit .js-submit_login": "submit_login"
		"click .js-show_new_post": "show_new_post"
		"submit .js-new_post_form": "submit_new_post_form"
		"click .js-logout": "logout"
	}


	initialize: ->
		$(document).on("keyup", this.check_escape)

		super()


	render: ->

		_.extend @data,
			list_id: window.list_id

		super()


		if Saturdays.user.get("is_admin")
			this.$el.removeClass "fade_out"


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


	show_new_post: (e)->
		this.$el.find(".js-show_new_post").addClass "hide"
		this.$el.find(".js-new_post_form").removeClass "hide"

	submit_new_post_form: (e)->
		e.preventDefault()

		model = new Saturdays.Models.ListPost()
		model.urlRoot = Saturdays.settings.api + "lists/"+window.list_id+"/posts"
		model.save {
			title: e.currentTarget["title"].value.trim()
			route: e.currentTarget["route"].value.trim().toLowerCase()
		},
			success: (model, response)->
				window.location = "/lists/blog/posts/"+model.attributes.route




	check_escape: (e)=>
		if e.keyCode == 27
			if this.$el.hasClass "fade_out"
				this.$el.removeClass "fade_out"
				this.$el.find("[name='email']").focus()

			else
				this.$el.addClass "fade_out"

				if Saturdays.session.is_authenticated()
					Saturdays.session.logout()
			
			



