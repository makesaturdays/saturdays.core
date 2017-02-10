
class Saturdays.Views.Editable extends Saturdays.View


	edit_admin_template: templates["cms/edit"]
	tags_template: templates["cms/tags"]
	tag_template: templates["cms/tag"]

	
	initialize: ->
		this.events["input input"] = "key_input"
		this.events["change input"] = "key_input"
		this.events["input [contenteditable]"] = "key_input"
		this.events["click [data-save]"] = "save_edit"
		this.events["click [data-destroy]"] = "destroy"
		this.events["click [data-add-tag]"] = "add_tag"
		this.events["click [data-remove-tag]"] = "remove_tag"
		this.events["click [data-image]"] = "trigger_upload"
		this.events["change [data-image-input]"] = "upload_image"

		this.listenTo @model, "sync", this.render
		@model.fetch()

		super()



	render: ->

		_.extend @data,
			model: @model.toJSON()

		super()

		if @data.has_permission
			this.$el.find("[data-image]").addClass "img--clickable"
			this.$el.find("[data-tags]").html this.tags_template({tags: @data.model.tags, name: "tag"})
			this.$el.find("[data-admin]").html this.edit_admin_template(@data)

			@button = this.$el.find("[data-save]")[0]

			this.delegateEvents()

		this


	save_edit: (e)->

		Turbolinks.controller.adapter.progressBar.setValue(0)
		Turbolinks.controller.adapter.progressBar.show()


		# @model.set
		# 	is_online: this.$el.find("[name='is_online']")[0].checked

		tags = []
		this.$el.find("[data-tag]").each (index, tag)=>
			tags.push tag.innerHTML

		@model.attributes.tags = tags

		image = this.$el.find("[src][data-image]")
		if image.length
			@model.set
				image: image.attr("src").replace(image.attr("data-image-cdn"), "")
			

		@model.save {},
			success: (model, response)=>
				Turbolinks.controller.adapter.progressBar.setValue(100)
				Turbolinks.controller.adapter.progressBar.hide()



	destroy: ->
		if confirm("Are you sure?")
			@model.destroy
				success: (model, response)->

					# window.location = "/lists/" + window.list_route


	key_input: (e)->
		if @button? and @button.hasAttribute "disabled"
			@button.removeAttribute "disabled"



	add_tag: (e)->
		this.insert_tag(e.currentTarget)
		$(e.currentTarget).parents("[data-tags]").find("[data-tag]").last().focus()

	remove_tag: (e)->
		$(e.currentTarget).parents(".tag").remove()


	trigger_upload: (e)->
		e.preventDefault()
		e.stopImmediatePropagation()

		this.$el.find("[data-image-input]").click()
		@image_to_upload = e.currentTarget


	upload_image: (e)->
		file = e.currentTarget.files[0]
		if file.type.match('image.*')
			Saturdays.helpers.upload file,
				success: (response)=>
					
					$(@image_to_upload).attr "src", Saturdays.settings.cdn+response.url
					this.key_input()



	# HELPERS
	insert_tag: (target)->
		values = target.value.trim().split(",")

		for value in values
			do (value)=>
				$(this.tag_template({tag: value.trim()})).insertBefore $(target)
		
		target.value = ""




