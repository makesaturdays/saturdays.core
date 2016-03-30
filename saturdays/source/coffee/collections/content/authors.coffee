class Saturdays.Collections.Authors extends Backbone.Collection

	url: Saturdays.settings.api + "authors"
	model: Saturdays.Models.Author
		
