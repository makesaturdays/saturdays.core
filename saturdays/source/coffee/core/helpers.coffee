




Saturdays.helpers =



	get_query_string: ->
		result = {}
		query_string = location.search.slice(1)
		regex = /([^&=]+)=([^&]*)/g
		m = null

		while (m = regex.exec(query_string))
			result[decodeURIComponent(m[1])] = decodeURIComponent(m[2])

		result




String.prototype.capitalize = ->
	array = this.split(" ")

	string = ""
	_.each array, (piece)->
		string += piece.charAt(0).toUpperCase() + piece.slice(1) + " "

	return string.trim()





