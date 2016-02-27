class Saturdays.Models.User extends Saturdays.Model

	urlRoot: Saturdays.settings.api + "users"


	initialize: (options={})->
		user_id = Saturdays.cookies.get("User-Id")

		if user_id?
			this.set 
				_id: user_id

			this.fetch()