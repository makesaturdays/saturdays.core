
class Saturdays.Views.Survey extends Backbone.View

	answers_template: templates["answers"]

	events: {
		"submit": "submit_form"
	}



	initialize: ->

		@survey = new Saturdays.Models.Survey({"_id": this.$el.attr("data-survey-id")})
		@survey.fetch()

		this.listenTo @survey, "sync", this.render

		this.render()




	render: ->

		if localStorage.getItem("survey_"+@survey.id+"_answers")?
			this.$el.html @answers_template(JSON.parse(localStorage.getItem("survey_"+@survey.id+"_answers")))


		this





	submit_form: (e)->
		e.preventDefault()

		form = e.currentTarget
		answers = []

		form.setAttribute("disabled", "disabled")

		for question in @survey.get("questions")
			if form[question["key"]]?
				if form[question["key"]].value == ""
					$(form[question["key"]]).focus()

					return false

				answers.push {
					question_key: question["key"],
					value: form[question["key"]].value.capitalize()
				}

		@survey_answer = new Saturdays.Models.SurveyAnswer()
		@survey_answer.local_storage = "survey_answer"
		@survey_answer.urlRoot = Saturdays.settings.api + "surveys/" + @survey.id + "/answers"
		@survey_answer.save {
			answers: answers
		},
			success: (model, response)=>
				localStorage.setItem("survey_"+@survey.id+"_answers", JSON.stringify(answers))

				this.render()
				form.removeAttribute("disabled")





		

		

