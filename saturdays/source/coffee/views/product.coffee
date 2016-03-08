
class Saturdays.Views.Product extends Saturdays.Views.Editable


	events: {
	}


	initialize: ->

		super()



	render: ->

		super()

		if @data.is_editable
			this.$el.find("[data-name]").attr "contenteditable", "true"
			this.$el.find("[data-price]").attr "contenteditable", "true"
			this.$el.find("[data-description]").attr "contenteditable", "true"

		this



	save_edit: (e)->
		@model.set
			name: this.$el.find("[data-name]").html()
			price: parseFloat(this.$el.find("[data-price]").text())
			description: this.$el.find("[data-description]").html()


		super()


