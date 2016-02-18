window.Saturdays.cookies =

	set: (name, value, expiry_days)->
		d = new Date()
		d.setTime d.getTime()+(expiry_days*24*60*60*1000)
		expires = "expires="+d.toGMTString()
		document.cookie = "saturdays_" + name + "=" + value + "; " + expires + "; path=/"


	set_for_a_session: (name, value)->
		document.cookie = "saturdays_" + name + "=" + value + "; path=/"


	get: (name)->
		name = "saturdays_" + name + "="
		value = false
		cookies = document.cookie.split(';')

		for cookie in cookies
			do (cookie)->
				cookie = cookie.trim()
				if cookie.indexOf(name) == 0
					value = cookie.substring(name.length, cookie.length)

		value = null unless value

		return value

	delete: (name)->
		document.cookie = 'saturdays_' + name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/'

