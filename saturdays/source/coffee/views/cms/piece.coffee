
class Saturdays.Views.Piece extends Saturdays.View


	piece_admin_template: templates["admin/piece_admin"]
	piece_link_template: templates["admin/piece_link"]


	events: {
		"click .js-save_piece": "save_piece"
		"input [data-key]": "key_input"
		"click [data-key]": "prevent_click"
		"click [data-image-key]": "trigger_upload"
		"change .js-image_input": "upload_image"
	}


	initialize: ->

		this.listenTo @model, "sync", this.render
		@model.fetch()

		super()


	render: ->

		super()


		if @data.is_authenticated
			this.$el.find("[data-key]").attr "contenteditable", "true"
			this.$el.find("[data-link-key]").each (index, link)=>
				$(link).before this.piece_link_template({
					key: link.getAttribute("data-link-key")
					link: link.getAttribute("href")
				})

				link.removeAttribute("data-link-key")

			this.$el.find("[data-image-key]").each (index, image)=>
				$(image).addClass "img--clickable"

			this.$el.find("[data-piece-admin]").html this.piece_admin_template(@data)
			@button = this.$el.find(".js-save_piece")[0]

		this



	save_piece: (e)->
		e.preventDefault()

		this.$el.find("[data-key]").each (index, key)=>
			@model.attributes.content[key.getAttribute("data-key")].value = key.innerHTML

		this.$el.find("[data-image-key]").each (index, key)=>
			@model.attributes.content[key.getAttribute("data-image-key")].value = key.getAttribute("src")


		@model.save()


	key_input: (e)->
		if @button.hasAttribute "disabled"
			@button.removeAttribute "disabled"


	trigger_upload: (e)->
		input = this.$el.find(".js-image_input")
		@image_key = e.currentTarget.getAttribute("data-image-key")
		input.click()


	upload_image: (e)->

		file = e.currentTarget.files[0]
		if file.type.match('image.*')
			Dialogue.helpers.upload file,
				success: (response)=>
					
					this.$el.find("[data-image-key='"+@image_key+"']").attr "src", Dialogue.settings.cdn+response.url
					this.key_input()




	prevent_click: (e)->
		
		if @data.is_authenticated
			e.preventDefault()



