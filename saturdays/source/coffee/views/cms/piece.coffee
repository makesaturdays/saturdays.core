
class Saturdays.Views.Piece extends Saturdays.View


	piece_admin_template: templates["admin/piece_admin"]
	piece_link_template: templates["admin/piece_link"]


	events: {
		"click .js-save_piece": "save_piece"
		"click [data-key]": "prevent_click"
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

			this.$el.find("[data-piece-admin]").html this.piece_admin_template(@data)

		this



	save_piece: (e)->
		e.preventDefault()

		this.$el.find("[data-key]").each (index, key)=>
			@model.attributes.content[key.getAttribute("data-key")].value = key.innerHTML

		@model.save()




	prevent_click: (e)->
		
		if @data.is_authenticated
			e.preventDefault()



