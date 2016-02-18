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
			@views.push new Saturdays.Views.Post({el: post})







