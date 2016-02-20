
class Saturdays.Views.Editable extends Saturdays.View


	edit_admin_template: templates["admin/edit_admin"]

	
	initialize: ->
		this.events["click .js-save_edit"] = "save_edit"
		

		this.listenTo @model, "sync", this.render

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

			this.$el.find("[data-admin]").html this.edit_admin_template(@data)

			this.delegateEvents()

		this


	save_edit: (e)->
		@model.set
			is_online: this.$el.find("[name='is_online']")[0].checked
			title: this.$el.find("[data-title]").html()
			published_date: this.$el.find("[data-published-date]").html()


		this.$el.find("[data-content-key]").each (index, content)=>
			@model.attributes.content[content.getAttribute("data-content-key")].value = if content.getAttribute("data-is-markdown")? then toMarkdown(content.innerHTML) else content.innerHTML

		@model.save()



