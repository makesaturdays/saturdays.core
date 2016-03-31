


window.Saturdays =
	Collections:{}
	Models:{}
	Views:{}
	Routers:{}


	settings:
		cdn: "https://d3hy1swj29dtr7.cloudfront.net/"
		api: "http://127.0.0.1:5000/"
		# api: "https://makesaturdays.com/"



	init: ->

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


_.extend Saturdays.settings, window.saturdays_settings if window.saturdays_settings?



$ ->
	Saturdays.init()














