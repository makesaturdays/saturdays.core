
class Saturdays.Views.Editable extends Saturdays.View


	edit_admin_template: templates["cms/edit"]
	tag_input_template: templates["cms/tag_input"]
	tag_template: templates["cms/tag"]

	
	initialize: ->
		this.events["input input"] = "key_input"
		this.events["change input"] = "key_input"
		this.events["input [contenteditable]"] = "key_input"
		this.events["click .js-save_edit"] = "save_edit"
		this.events["click .js-destroy"] = "destroy"
		this.events["keypress [name='tag_input']"] = "input_tag"
		this.events["blur [name='tag_input']"] = "blur_tag"


		this.listenTo @model, "sync", this.render

		@model.fetch()

		super()



	render: ->

		_.extend @data,
			model: @model.toJSON()

		super()

		if @data.is_authenticated
			this.$el.find("[data-tag]").attr "contenteditable", "true"
			this.$el.find("[data-tag-input]").html this.tag_input_template(@data)

			this.$el.find("[data-admin]").html this.edit_admin_template(@data)

			@button = this.$el.find(".js-save_edit")[0]

			this.delegateEvents()

		this


	save_edit: (e)->
		@model.set
			is_online: this.$el.find("[name='is_online']")[0].checked

		tags = []
		this.$el.find("[data-tag]").each (index, tag)=>
			tags.push tag.innerHTML

		@model.attributes.tags = tags
			

		@model.save()



	destroy: ->
		if confirm("Are you sure?")
			@model.destroy
				success: (model, response)->

					window.location = "/lists/" + window.list_route


	key_input: (e)->
		if @button.hasAttribute "disabled"
			@button.removeAttribute "disabled"



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




