class Saturdays.Models.Session extends Saturdays.Model

	urlRoot: Saturdays.settings.api + "sessions"


	initialize: (options={})->
		this.set 
			secret: Saturdays.cookies.get("Session-Secret")
			user_id: Saturdays.cookies.get("User-Id")



	login: (data={}, options={})->
		Saturdays.session.save data,
			success: (model, response)->
				Saturdays.cookies.set "Session-Secret", response.secret
				Saturdays.cookies.set "User-Id", response.user_id

				Saturdays.user.initialize()



	logout: ->
		this.clear()

		Saturdays.user.clear()

		Saturdays.cookies.delete "Session-Secret"
		Saturdays.cookies.delete "User-Id"
		
		window.location = window.location
		
