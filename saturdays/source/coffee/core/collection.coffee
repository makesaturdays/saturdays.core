class Saturdays.Collection extends Backbone.Collection

	model: Saturdays.Model
		


	fetch: (options={})->
		super Saturdays.Model.prototype.set_secret_header(options)



