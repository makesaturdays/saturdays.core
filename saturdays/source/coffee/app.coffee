


window.Saturdays =
	Collections:{}
	Models:{}
	Views:{}
	Routers:{}


	settings:
		# api: "http://127.0.0.1:5000/"
		api: "https://makesaturdays.com/"



	init: (settings)->
		_.extend @settings, settings if settings?

		@session = new Saturdays.Models.Session()
		@user = new Saturdays.Models.User()
		
		@admin_view = new Saturdays.Views.Admin()

		@router = new Saturdays.Routers.Router()
		Backbone.history.start
			pushState: true
	


		
		

Saturdays = window.Saturdays
_ = window._
Backbone = window.Backbone
jQuery = window.jQuery




$ ->
	Saturdays.init(window.saturdays_settings)














