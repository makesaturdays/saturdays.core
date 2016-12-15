


window.Saturdays =
	Collections:{}
	Models:{}
	Views:{}
	Routers:{}


	settings:
		cdn: "https://d3hy1swj29dtr7.cloudfront.net/"
		api: "http://127.0.0.1:5000/"

	views: []


	init: ->

		@session = new Saturdays.Models.Session()
		@user = new Saturdays.Models.User()
		@cart = new Saturdays.Models.Cart()
		
		@login_view = new Saturdays.Views.Login()
		@cart_view = new Saturdays.Views.Cart()

		@header_view = new Saturdays.Views.Header()

		this.render_views()
		document.addEventListener "turbolinks:render", this.render_views.bind(this)


	render_views: ->
		for view in @views
			view.undelegateEvents()

		delete @views
		@views = []

		$("[data-product-id]").each (index, element)=>
			model = new Saturdays.Models.Product({"_id": element.getAttribute("data-product-id")})
			@views.push new Saturdays.Views.Product({
				el: element, 
				model: model
			})

		$("[data-shop-id]").each (index, element)=>
			model = new Saturdays.Models.VendorShop({"_id": element.getAttribute("data-shop-id")})
			@views.push new Saturdays.Views.VendorShop({
				el: element, 
				model: model
			})

		$("[data-post-id]").each (index, element)=>
			model = new Saturdays.Models.ListPost({"_id": element.getAttribute("data-post-id")})
			model.urlRoot = Saturdays.settings.api + "lists/"+window.list_id+"/posts"
			@views.push new Saturdays.Views.Post({
				el: element, 
				model: model
			})

		$("[data-search]").each (index, element)=>
			@views.push new Saturdays.Views.Search({
				el: element
			})

		$("[data-freelancer-id]").each (index, element)=>
			model = new Saturdays.Models.Freelancer({"_id": element.getAttribute("data-freelancer-id")})
			@views.push new Saturdays.Views.Freelancer({
				el: element, 
				model: model
			})

		$("[data-piece-id]").each (index, element)=>
			model = new Saturdays.Models.Piece({"_id": element.getAttribute("data-piece-id")})
			@views.push new Saturdays.Views.Piece({
				el: element
				model: model
			})

		$("[data-navigation]").each (index, element)=>
			@views.push new Saturdays.Views.Navigation({
				el: element
			})

		today = new Date()
		$('[data-day]').each (index, element)=>
			element.innerHTML = pieces.navigation.weekdays[today.getDay()]


		@query = Saturdays.helpers.get_query_string()
		if @query.cart? then Saturdays.cart_view.show() else Saturdays.cart_view.hide()
		if @query.login? then Saturdays.login_view.show() else Saturdays.login_view.hide()
		
	


Saturdays = window.Saturdays
_ = window._
Backbone = window.Backbone
jQuery = window.jQuery


_.extend Saturdays.settings, window.saturdays_settings if window.saturdays_settings?



$ ->
	Saturdays.init()














