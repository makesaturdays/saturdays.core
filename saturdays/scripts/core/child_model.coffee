class Saturdays.ChildModel extends Saturdays.Model

	endpoint: "child"


	initialize: ->

		@urlRoot = this.get("parent").url() + "/" + @endpoint if this.has("parent")

		super()

	

