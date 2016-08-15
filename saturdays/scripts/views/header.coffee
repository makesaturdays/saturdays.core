
class Saturdays.Views.Header extends Saturdays.View

	el: $("#header")
	user_links_template: templates["user/links"]

	events: {

	}


	initialize: ->

		super()


	render: ->


		super()

		if @data.is_authenticated
			this.$el.find("[data-user-links]").html this.user_links_template(@data)


		this


