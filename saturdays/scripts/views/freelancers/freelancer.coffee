
class Saturdays.Views.Freelancer extends Saturdays.Views.Editable

	edit_admin_template: templates["freelancers/admin"]
	route_box_template: templates["freelancers/route_box"]
	edit_box_template: templates["freelancers/edit_box"]
	is_available_template: templates["freelancers/is_available"]
	links_template: templates["freelancers/links"]
	link_template: templates["freelancers/link"]
	projects_template: templates["freelancers/projects"]
	project_template: templates["freelancers/project"]

	events: {
		"click [data-add-link]": "add_link"
		"click [data-remove-link]": "remove_link"
		"click [data-add-project]": "add_project"
		"click [data-remove-project]": "remove_project"
		"change [name='is_available']": "change_is_available"
		"click [data-project-image]": "trigger_upload"
		"click [data-show-edit]": "show_edit"
	}


	initialize: ->

		super()



	render: ->
	

		super()

		if @data.has_permission
			this.$el.find("[data-first-name]").attr "contenteditable", "true"
			this.$el.find("[data-last-name]").attr "contenteditable", "true"
			this.$el.find("[data-bio]").attr "contenteditable", "true"
			this.$el.find("[data-rate]").attr "contenteditable", "true"

			this.$el.find("[data-route-box]").html this.route_box_template(@data)
			this.$el.find("[data-skills]").html this.tags_template({tags: @data.model.skills, name: "skill"})
			this.$el.find("[data-edit-box]").html this.edit_box_template(@data)
			this.$el.find("[data-is-available]").html this.is_available_template(@data)
			this.$el.find("[data-links]").html this.links_template({links: @data.model.links})
			this.$el.find("[data-projects]").html this.projects_template({projects: @data.model.projects})
			
			this.delegateEvents()

		this



	save_edit: (e)->

		@model.set
			first_name: this.$el.find("[data-first-name]").text()
			last_name: this.$el.find("[data-last-name]").text()
			rate: this.$el.find("[data-rate]").text()
			bio: this.$el.find("[data-bio]").html()
			route: this.$el.find("[data-route]").text()
			is_available: this.$el.find("[name='is_available']")[0].checked
			skills: []
			links: []
			projects: []

		this.$el.find("[data-skills] [data-tag]").each (index, skill)=>
			@model.attributes.skills.push skill.innerText

		this.$el.find("[data-link]").each (index, link)=>
			@model.attributes.links.push {
				label: $(link).find("[data-link-label]").text()
				url: $(link).find("[data-link-url]").text()
			}

		this.$el.find("[data-project]").each (index, project)=>
			@model.attributes.projects.push {
				title: $(project).find("[data-project-title]").text()
				description: $(project).find("[data-project-description]").text()
				contributions: $(project).find("[data-project-contributions]").text()
				url: $(project).find("[data-project-url]").text()
				image: $(project).find("[data-project-image]").attr("src").replace($(project).find("[data-project-image]").attr("data-image-cdn"), "")
			}

		super()



	change_is_available: (e)->
		this.$el.find("[data-dot]").attr "checked", e.currentTarget.checked


	add_link: (e)->
		this.insert_link(e.currentTarget)
		this.$el.find("[data-link-label]").last().focus()

	remove_link: (e)->
		$(e.currentTarget).parents("[data-link]").remove()


	add_project: (e)->
		this.insert_project(e.currentTarget)
		this.$el.find("[data-project-contributions]").last().focus()

	remove_project: (e)->
		$(e.currentTarget).parents("[data-project]").remove()


	show_edit: (e)->
		e.preventDefault()

		window.history.replaceState(null, null, location.pathname+"?edit=true")
		Saturdays.edit_view.show(e)



	# HELPERS
	insert_link: (target)->
		$(this.link_template()).insertBefore $(target)

	insert_project: (target)->
		$(this.project_template()).insertBefore $(target)






