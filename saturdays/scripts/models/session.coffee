class Saturdays.Models.Session extends Saturdays.Model

	urlRoot: Saturdays.settings.api + "sessions"


	initialize: (options={})->
		this.set 
			_id: Saturdays.cookies.get("Session-Id")
			secret: Saturdays.cookies.get("Session-Secret")
			user_id: Saturdays.cookies.get("User-Id")
			token_id: Saturdays.cookies.get("Token-Id")


	login: (data={}, options={})->
		Saturdays.session.save data,
			success: (model, response)->
				Saturdays.cookies.set "Session-Id", response._id
				Saturdays.cookies.set "Session-Secret", response.secret
				Saturdays.cookies.set "User-Id", response.user_id

				Saturdays.user.initialize()

				query = Saturdays.helpers.get_query_string()
				if query.token_code?
					Saturdays.cookies.set "Token-Id", response.token_id

					window.location = "?edit=true"


	logout: ->
		this.clear()

		Saturdays.user.clear()

		Saturdays.cookies.delete "Session-Id"
		Saturdays.cookies.delete "Session-Secret"
		Saturdays.cookies.delete "User-Id"
		Saturdays.cookies.delete "Token-Id"
		Saturdays.cookies.delete "Cart-Id"
		
		window.location = window.location.pathname


	is_authenticated: ->
		Saturdays.cookies.get("User-Id")?
		
