
class Saturdays.Views.Editable extends Saturdays.View


	
	initialize: ->
		# this.events["blur [contenteditable='true']"] = "blur_edit"

		super()



	render: ->

		_.extend @data,
			is_editable: Saturdays.session.has("user_id")

		super()

		if @data.is_editable
			this.$el.find("[data-content-key]").attr "contenteditable", "true"

		this





	# blur_edit: (e)->
	# 	console.log markdown.toHTML(toMarkdown(e.currentTarget.innerHTML))
	# 	e.currentTarget.innerHTML = markdown.toHTML(toMarkdown(e.currentTarget.innerHTML))