class Saturdays.Routers.Router extends Backbone.Router



	routes: {
		"products(/:pretty_url)(/)": "products"
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


		$(".js-piece").each (index, element)=>
			model = new Saturdays.Models.Piece({"_id": element.getAttribute("data-id")})
			@views.push new Saturdays.Views.Piece({
				el: element
				model: model
			})




	home: ->
		if $(".js-survey").length > 0
			@survey_view = new Saturdays.Views.Survey()


	products: (pretty_url)->
		$(".js-product").each (index, element)=>
			model = new Saturdays.Models.Product({"_id": element.getAttribute("data-id")})
			@views.push new Saturdays.Views.Product({
				el: element, 
				model: model
			})


	list: (list_route, route)->
		$(".js-post").each (index, element)=>
			model = new Saturdays.Models.ListPost()
			model.urlRoot = Saturdays.settings.api + "lists/"+window.list_id+"/posts"
			@views.push new Saturdays.Views.Post({
				el: element, 
				model: model
			})










