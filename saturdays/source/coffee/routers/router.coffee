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



	home: ->
		if $(".js-survey").length > 0
			@survey_view = new Saturdays.Views.Survey()


	products: (pretty_url)->
		$(".js-product").each (index, product)=>
			model = new Saturdays.Models.Product({"_id": product.getAttribute("data-id")})
			@views.push new Saturdays.Views.Product({
				el: product, 
				model: model
			})


	list: (list_route, route)->
		
		$(".js-post").each (index, post)=>
			model = new Saturdays.Models.ListPost()
			model.urlRoot = Saturdays.settings.api + "lists/"+window.list_id+"/posts"
			@views.push new Saturdays.Views.Post({
				el: post, 
				model: model
			})










