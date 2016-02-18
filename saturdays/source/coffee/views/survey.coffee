
class Saturdays.Views.Survey extends Backbone.View

	el: $(".js-survey")

	events: {
		"focus .js-input": "focus_input"
		"submit .js-form": "submit_form"
		"click .js-reset": "reset"
	}



	initialize: ->

		@answers = new Bloodhound({
			datumTokenizer: Bloodhound.tokenizers.whitespace,
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			local: pieces.survey.answers
		})


		@survey = new Saturdays.Models.Survey({"_id": "56b60e72f5f9e96ffb235c64"})
		@survey.fetch()

		this.listenTo @survey, "sync", this.render


		# this.render()



	render: ->

		if localStorage.getItem("survey_answer")?
			answers = @survey.get("questions")[0]["answers"]
			second_answers = @survey.get("questions")[1]["answers"]
			highest_count = 0

			for key,count of answers
				if second_answers[key]?
					answers[key] = answers[key] + second_answers[key]
					delete second_answers[key]


			for key,count of second_answers
				answers[key] = second_answers[key]
				

			for key,count of answers
				if answers[key] > highest_count
					highest_count = answers[key]


			this.$el.find(".js-answers").html templates["answers"]({
				answers: answers
				highest_count: highest_count
			})

			this.$el.find(".js-results").removeClass "hide"
			setTimeout =>
				this.$el.find(".js-results").removeClass "fade_out"
			, 1




		else
			$("body").removeClass "white_back"
			
			this.$el.find(".js-questions").removeClass "hide"
			this.$el.find(".js-typeahead").typeahead({
				hint: true,
				highlight: true,
				minLength: 1
			},
			{
				source: @answers,
				name: "answers",
				templates: 
					suggestion: templates["answer"]
			})



			setTimeout =>
				this.$el.find(".js-questions").removeClass "fade_out"
				this.$el.find(".js-question")[1].focus()
			, 1


		this



	focus_input: (e)->

		this.$el.find(".js-input").addClass "input_box--faded"
		$(e.currentTarget).removeClass "input_box--faded"
		$(e.currentTarget).removeClass "input_box--hidden"



	submit_form: (e)->
		e.preventDefault()

		form = e.currentTarget
		answers = []

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
				this.$el.find(".js-questions").addClass "fade_out"

				setTimeout =>
					this.$el.find(".js-questions").addClass "hide"
					@survey.fetch()
				, 666





	reset: (e)->
		e.preventDefault()

		this.$el.find(".js-results").addClass "fade_out"
		this.$el.find(".js-form")[0].reset()
		this.$el.find(".js-typeahead").typeahead("destroy")
		localStorage.removeItem("survey_answer")

		setTimeout =>
			this.render()

		, 666
		

		

