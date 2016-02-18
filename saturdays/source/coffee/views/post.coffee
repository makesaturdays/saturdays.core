
class Saturdays.Views.Post extends Saturdays.Views.Editable


	events: {
		"click .js-maximize": "maximize"
		"click .js-minimize": "minimize"
	}


	initialize: ->

		super()

		this.render()


	render: ->

		super()


		$(document.links).filter(()->
			this.hostname != window.location.hostname
		).attr('target', '_blank')


		this


	maximize: (e)->
		e.preventDefault()

		$(e.currentTarget).addClass "hide"
		this.$el.find(".js-minimize").removeClass "hide"
		this.$el.find(".blog__post__content").removeClass "blog__post__content--minimized"

		Saturdays.router.navigate e.currentTarget.getAttribute("href")


	minimize: (e)->
		e.preventDefault()

		$(e.currentTarget).addClass "hide"
		this.$el.find(".js-maximize").removeClass "hide"
		this.$el.find(".blog__post__content").addClass "blog__post__content--minimized"

		Saturdays.router.navigate "/lists/blog"


