
class Saturdays.Views.Product extends Saturdays.Views.Editable

	product_edit_admin_template: templates["ecom/product_edit"]

	events: {
		"click [data-add-to-cart]": "add_to_cart"
	}


	initialize: ->
		Saturdays.vendor_shops = new Saturdays.Collections.VendorShops() unless Saturdays.vendor_shops?
		
		this.listenTo Saturdays.vendor_shops, "sync", this.render
		Saturdays.vendor_shops.fetch()

		super()



	render: ->
		_.extend @data,
			shops: Saturdays.vendor_shops.toJSON()

		super()

		if @data.is_admin
			this.$el.find("[data-name]").attr "contenteditable", "true"
			this.$el.find("[data-price]").attr "contenteditable", "true"
			this.$el.find("[data-description]").attr "contenteditable", "true"

			this.$el.find("[data-product-admin]").html this.product_edit_admin_template(@data)

			this.delegateEvents()

		this


	add_to_cart: (e)->
		e.currentTarget.setAttribute "disabled", "disabled"

		Saturdays.cart.add_to_cart @model.id, this.$el.find("[name='option_id']").val(), 1,
			success: (model, response)->
				e.currentTarget.removeAttribute "disabled"

			error: (model, response)->
				e.currentTarget.removeAttribute "disabled"

		


	save_edit: (e)->
		@model.set
			name: this.$el.find("[data-name]").html()
			price: parseFloat(this.$el.find("[data-price]").text())
			description: this.$el.find("[data-description]").html()
			sku: this.$el.find("[name='sku']").val()
			inventory: parseInt(this.$el.find("[name='inventory']").val())
			vendor_shop_id: this.$el.find("[name='vendor_shop_id']").val() or null
			is_taxable: this.$el.find("[name='is_taxable']")[0].checked
			is_salable: this.$el.find("[name='is_salable']")[0].checked


		super()


