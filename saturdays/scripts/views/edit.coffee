
class Saturdays.Views.Edit extends Saturdays.Views.Login

	el: $("#edit")
	template: templates["user/edit"]

	events: {
		"submit [data-edit-form]": "submit_edit"
	}


	initialize: ->

		super()

		$(document).off("keyup", this.check_escape)


	render: ->

		super()


		this




	submit_edit: (e)->
		e.preventDefault()

		Saturdays.user.save {
			password: e.currentTarget["password"].value
		},
			patch: true
			success: (model, response)=>
				this.$el.find("[data-success]").html "<span class='highlight'>Your password was updated successfully.</span>"





