
class Saturdays.Views.Search extends Saturdays.View


	events: {
		"input [name='search']": "search_input"
	}


	initialize: ->

		super()



	render: ->

		super()

		this


	search_input: (e)->
		clearTimeout @input_timeout if @input_timeout?
		@input_timeout = setTimeout ->
			Turbolinks.controller.adapter.progressBar.setValue(0)
			Turbolinks.controller.adapter.progressBar.show()

			history.replaceState(null, null, "/freelancers/_search?query="+e.currentTarget.value)
			$.get "/freelancers/_search?query="+e.currentTarget.value, (response)->
				Turbolinks.controller.adapter.progressBar.setValue(100)
				Turbolinks.controller.adapter.progressBar.hide()

				$("[data-freelancers]").html $(response).find("[data-freelancers]").html()
		, 333





