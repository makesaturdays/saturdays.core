
class Saturdays.Views.Post extends Saturdays.Views.Editable

	author_input_template: templates["admin/author_input"]
	author_template: templates["admin/author"]


	events: {
		"click .js-maximize": "maximize"
		"click .js-minimize": "minimize"
	}


	initialize: ->
		Saturdays.authors = new Saturdays.Collections.Authors() unless Saturdays.authors?
		
		this.listenTo Saturdays.authors, "sync", this.render
		Saturdays.authors.fetch()

		super()



	render: ->
		_.extend @data,
			authors: Saturdays.authors.toJSON()

		super()

		if @data.is_authenticated
			this.$el.find("[data-title]").attr "contenteditable", "true"
			this.$el.find("[data-published-date]").attr "contenteditable", "true"
			this.$el.find("[data-content-key]").attr "contenteditable", "true"

			this.$el.find("[data-author-input]").html this.author_input_template(@data)

			this.delegateEvents()

		this



	save_edit: (e)->
		@model.set
			title: this.$el.find("[data-title]").html()
			published_date: this.$el.find("[data-published-date]").html()
			authors: this.$el.find("[name='authors']").val()

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


