class Saturdays.Routers.Router extends Backbone.Router



	routes: {
		"products(/:pretty_url)(/)": "products"
		"vendor_shops(/:pretty_url)(/)": "vendor_shops"
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


		$("[data-piece-id]").each (index, element)=>
			model = new Saturdays.Models.Piece({"_id": element.getAttribute("data-piece-id")})
			@views.push new Saturdays.Views.Piece({
				el: element
				model: model
			})


		@today = new Date()
		$('[data-day]').each (index, element)=>
			element.innerHTML = pieces.navigation.weekdays[@today.getDay()]




	home: ->
		


	products: (pretty_url)->
		$(".js-product").each (index, element)=>
			model = new Saturdays.Models.Product({"_id": element.getAttribute("data-id")})
			@views.push new Saturdays.Views.Product({
				el: element, 
				model: model
			})

	vendor_shops: (pretty_url)->
		$(".js-shop").each (index, element)=>
			model = new Saturdays.Models.VendorShop({"_id": element.getAttribute("data-id")})
			@views.push new Saturdays.Views.VendorShop({
				el: element, 
				model: model
			})


	list: (list_route, route)->
		$("[data-post-id]").each (index, element)=>
			model = new Saturdays.Models.ListPost({"_id": element.getAttribute("data-post-id")})
			model.urlRoot = Saturdays.settings.api + "lists/"+window.list_id+"/posts"
			@views.push new Saturdays.Views.Post({
				el: element, 
				model: model
			})










