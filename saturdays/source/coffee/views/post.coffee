
class Saturdays.Views.Post extends Saturdays.Views.Editable


	events: {
		"click .js-maximize": "maximize"
		"click .js-minimize": "minimize"
	}


	initialize: ->

		super()



	render: ->

		super()

		if @data.is_editable
			this.$el.find("[data-title]").attr "contenteditable", "true"
			this.$el.find("[data-published-date]").attr "contenteditable", "true"
			this.$el.find("[data-content-key]").attr "contenteditable", "true"

		this



	save_edit: (e)->
		@model.set
			title: this.$el.find("[data-title]").html()
			published_date: this.$el.find("[data-published-date]").html()


		value = ""
		this.$el.find("[data-content-key]").each (index, content)=>
			value = content.innerHTML
			if content.getAttribute("data-is-markdown")?
				value = toMarkdown(content.innerHTML)
				content.innerHTML = marked(value)
				
			@model.attributes.content[content.getAttribute("data-content-key")].value = value


		super()



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


