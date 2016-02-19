
class Saturdays.Views.Editable extends Saturdays.View




	
	initialize: ->
		this.events["click .js-save_edit"] = "save_edit"


		@model.set
			_id: this.$el.attr("data-id")
		@model.fetch()

		super()



	render: ->

		_.extend @data,
			is_editable: Saturdays.session.has("user_id")
			model: @model.toJSON()

		super()

		if @data.is_editable
			this.$el.find("[data-title]").attr "contenteditable", "true"
			this.$el.find("[data-published-date]").attr "contenteditable", "true"
			this.$el.find("[data-content-key]").attr "contenteditable", "true"

		this


	save_edit: (e)->


	# 	console.log markdown.toHTML(toMarkdown(e.currentTarget.innerHTML))
	# 	e.currentTarget.innerHTML = markdown.toHTML(toMarkdown(e.currentTarget.innerHTML))



