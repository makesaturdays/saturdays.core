class Saturdays.Routers.Router extends Backbone.Router



	routes: {
		"lists/:list_route(/tags)(/authors)(/posts)(/:route)(/)": "list"
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


	list: (list_route, route)->
		
		$(".js-post").each (index, post)=>
			model = new Saturdays.Models.ListPost()
			model.urlRoot = Saturdays.settings.api + "lists/"+window.list_id+"/posts"
			@views.push new Saturdays.Views.Post({
				el: post, 
				model: model
			})










