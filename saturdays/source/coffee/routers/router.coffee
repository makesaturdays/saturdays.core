class Saturdays.Routers.Router extends Backbone.Router



	routes: {
		"lists/blog(/tags)(/authors)(/posts)(/:route)(/)": "blog"
		"(/)": "home"
	}

	views: []
	

	initialize: ->



	execute: (callback, args)->

		for view in @views
			view.destroy()

		delete @views
		@views = []

		callback.apply(this, args) if callback?



	home: ->
		if $(".js-survey").length > 0
			@survey_view = new Saturdays.Views.Survey()


	blog: (route)->
		
		$(".js-post").each (index, post)=>
			model = new Saturdays.Models.ListPost()
			model.urlRoot = Saturdays.settings.api + "lists/56bccdb3f5f9e91c18cc17c0/posts"
			@views.push new Saturdays.Views.Post({
				el: post, 
				model: model
			})







