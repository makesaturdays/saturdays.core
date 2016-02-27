class Saturdays.Model extends Backbone.Model

	urlRoot: Saturdays.settings.api + "models"
	idAttribute: "_id"






	save: (data, options={}, local_only=false)->
		if this.local_storage?
			this.set data

			try
				localStorage.setItem this.local_storage, JSON.stringify(this.toJSON())
				
			catch e
				console.log "Warning: localStorage is disabled"

	
		if local_only
			options.success(this, this.toJSON()) if options.success?

		else
			super data, this.set_secret_header(options)



	fetch: (options={})->
		if this.local_storage? and localStorage.getItem(this.local_storage)?
			this.set this.parse(JSON.parse(localStorage.getItem(this.local_storage)))

		if this.id?
			super this.set_secret_header(options)



	destroy: (options={})->
		localStorage.removeItem this.local_storage if this.local_storage?

		super this.set_secret_header(options)


	clear: ->
		localStorage.removeItem this.local_storage if this.local_storage?

		super()



	set_secret_header: (options)->
		options.headers = {} unless options.headers?
		options.headers['Accept'] = 'application/json'
		options.headers['X-Session-Secret'] = Saturdays.cookies.get("Session-Secret")

		return options

	

