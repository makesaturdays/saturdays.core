
class Saturdays.Views.VendorShop extends Saturdays.Views.Editable

	shop_edit_admin_template: templates["ecom/shop_edit"]

	events: {
	}


	initialize: ->

		super()



	render: ->

		super()

		if @data.is_authenticated
			this.$el.find("[data-name]").attr "contenteditable", "true"
			this.$el.find("[data-description]").attr "contenteditable", "true"

			this.$el.find("[data-shop-admin]").html this.shop_edit_admin_template(@data)

			this.delegateEvents()

		this



	save_edit: (e)->
		@model.set
			name: this.$el.find("[data-name]").html()
			description: this.$el.find("[data-description]").html()


		super()


