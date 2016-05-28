class Saturdays.Models.CreditCard extends Saturdays.ChildModel


	endpoint: "credit_cards"

	parse: (response)->

		if response.exp_month?
			response.expiry = response.exp_month + " / " + response.exp_year

		response


	save: (data={}, options={}, token_only=false)->
		
		if data["expiry"]?
			exp = data["expiry"].split(" / ")
			data["exp_month"] = exp[0]
			data["exp_year"] = exp[1]

		this.set data

		Stripe.card.createToken
			number: this.get('number')
			exp_month: parseInt this.get('exp_month')
			exp_year: parseInt this.get('exp_year')
			cvc: parseInt this.get('cvc')
			address_line1: this.get('billing_street')
			address_zip: this.get('billing_zip')
		, (status, response)=>
			if status is 200
				this.set 
					provider_date: response.card

				if token_only
					this.set 
						card_token: response.id
					options.success this, response if options.success?

				else
					super {card_token: response.id}, options


			else
				options.error(this, response) if options.error?


