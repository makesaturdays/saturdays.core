class Saturdays.Collections.VendorShops extends Backbone.Collection

	url: Saturdays.settings.api + "vendor_shops"
	model: Saturdays.Models.VendorShop
		
