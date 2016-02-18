




Handlebars.registerHelper 'first', (models, options)->
	if models? and models[0]?
		return options.fn models[0]
	else
		return null

Handlebars.registerHelper 'last', (models, options)->
	if models? and models[models.length-1]?
		return options.fn models[models.length-1]
	else
		return null


Handlebars.registerHelper 'get', (model, key)->
	if model? and model[key]?
		return model[key]
	else
		null


Handlebars.registerHelper 'if_get', (model, key, options)->
	if model[key]? and model[key]
		options.fn this
	else
		return null

Handlebars.registerHelper 'unless_get', (model, key, options)->
	if model[key]? and model[key]
		return null
	else
		options.fn this


Handlebars.registerHelper 'if_equal', (left, right, options)->
	if left is right
		options.fn this
	else
		return null

Handlebars.registerHelper 'if_lower', (left, right, options)->
	if left < right
		options.fn this
	else
		return null

Handlebars.registerHelper 'if_higher', (left, right, options)->
	if left > right
		options.fn this
	else
		return null


Handlebars.registerHelper 'if_get_equal', (model, key, right, options)->
	if model[key]? and model[key] is right
		options.fn this
	else
		return null


Handlebars.registerHelper 'unless_equal', (left, right, options)->
	if left isnt right
		options.fn this
	else
		return null


Handlebars.registerHelper 'if_in_array', (array, right, options)->
	if array? and _.contains(array, right)
		options.fn this
	else
		return null



Handlebars.registerHelper 'date', (date)->
	date = new Date(date)
	return date.toLocaleDateString()


Handlebars.registerHelper 'if_dates_equal', (left, right, options)->
	left = new Date(left)
	right = new Date(right)
	if left.toLocaleDateString() is right.toLocaleDateString()
		options.fn this
	else
		return null



Handlebars.registerHelper 'json', (json)->
	return JSON.stringify(JSON.parse(json), undefined, 2)



Handlebars.registerHelper 'address', (address)->
	address_text = ""
	if address?
		if address.name?
			address.first_name = address.name
			address.last_name = ""
		address_text += address.first_name+" "+address.last_name+"<br>"+address.street
		address_text += address.street_continued if address.street_continued? and address.street_continued != ""
		address_text += " "+address.city+", "+address.region+", "+address.country+" "+address.zip

	return address_text



Handlebars.registerHelper 'percentage', (value)->
	return (value*100)+"%"


Handlebars.registerHelper 'ms', (value)->
	return (parseFloat(value)).toFixed(3)+"ms"



Handlebars.registerHelper 'plus', (left, right)->
	return left+right

Handlebars.registerHelper 'minus', (left, right)->
	return left-right

Handlebars.registerHelper 'times', (value, times)->
	return value*times

Handlebars.registerHelper 'divide', (left, right)->
	return left/right


Handlebars.registerHelper 'encode_uri', (url)->
	return encodeURIComponent(url)

Handlebars.registerHelper 'first_letter', (string)->
	return string[0].toUpperCase() if string?

Handlebars.registerHelper 'first_word', (string)->
	return string.split(" ")[0] if string?

Handlebars.registerHelper 'name_from_email', (email)->
	return email.split("@")[0] if email?

Handlebars.registerHelper 'first_name_from_name', (name)->
	return name.split(" ")[0] if name?


