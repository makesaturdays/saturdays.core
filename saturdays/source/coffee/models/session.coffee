class Saturdays.Models.Session extends Saturdays.Model

	urlRoot: Saturdays.settings.api + "sessions"


	initialize: (options={})->
		this.set 
			secret: Saturdays.cookies.get("session_secret")
			user_id: Saturdays.cookies.get("user_id")



	login: (data={}, options={})->
		Saturdays.session.save data,
			success: (model, response)->
				Saturdays.cookies.set "session_secret", response.secret
				Saturdays.cookies.set "user_id", response.user_id

				Saturdays.user.initialize()



	logout: ->
		this.clear()

		Saturdays.user.clear()

		Saturdays.cookies.delete "session_secret"
		Saturdays.cookies.delete "user_id"
		
		window.location = window.location
		
