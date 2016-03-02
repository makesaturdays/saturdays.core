
class Saturdays.Views.Editable extends Saturdays.View


	edit_admin_template: templates["admin/edit_admin"]
	tag_input_template: templates["admin/tag_input"]
	tag_template: templates["admin/tag"]
	author_input_template: templates["admin/author_input"]
	author_template: templates["admin/author"]

	
	initialize: ->
		this.events["click .js-save_edit"] = "save_edit"
		this.events["click .js-destroy"] = "destroy"
		this.events["keypress [name='tag_input']"] = "input_tag"
		this.events["blur [name='tag_input']"] = "blur_tag"


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

			this.$el.find("[data-tag]").attr "contenteditable", "true"
			this.$el.find("[data-tag-input]").html this.tag_input_template(@data)

			this.$el.find("[data-admin]").html this.edit_admin_template(@data)

			this.delegateEvents()

		this


	save_edit: (e)->
		@model.set
			is_online: this.$el.find("[name='is_online']")[0].checked
			title: this.$el.find("[data-title]").html()
			published_date: this.$el.find("[data-published-date]").html()


		tags = []
		this.$el.find("[data-tag]").each (index, tag)=>
			tags.push tag.innerHTML

		@model.attributes.tags = tags
			
		@model.attributes.content = {} unless @model.attributes.content?
		this.$el.find("[data-content-key]").each (index, content)=>
			value = content.innerHTML
			is_markdown = content.getAttribute("data-is-markdown")?
			if is_markdown
				value = toMarkdown(content.innerHTML)
				content.innerHTML = marked(value)
			
			@model.attributes.content[content.getAttribute("data-content-key")] = {
				value: value
				is_markdown: is_markdown
			} 

		console.log @model
		@model.save()



	destroy: ->
		if confirm("Are you sure?")
			@model.destroy
				success: (model, response)->

					window.location = "/lists/" + window.list_route




	input_tag: (e)->
		if e.keyCode == 13
			e.preventDefault()
			this.insert_tag(e.currentTarget)


	blur_tag: (e)->
		value = e.currentTarget.value.trim()

		unless value is ""
			e.preventDefault()
			this.insert_tag(e.currentTarget)

			$(e.currentTarget).focus()



	# HELPERS
	insert_tag: (target)->
		values = target.value.trim().split(",")

		for value in values
			do (value)=>
				$(this.tag_template({tag: value.trim().toLowerCase()})).insertBefore $(target).parent()
		
		target.value = ""




