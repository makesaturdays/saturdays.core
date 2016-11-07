class Saturdays.Models.User extends Saturdays.Model

	urlRoot: Saturdays.settings.api + "users"


	initialize: (options={})->
		unless options._id?
			user_id = Saturdays.cookies.get("User-Id")

			if user_id?
				this.set 
					_id: user_id

				this.fetch()


	signup: (data, options={})->
		this.save data,
			success: (model, response)->
				options.success(model, response) if options.success?

				# Saturdays.session.login data, options