
class Saturdays.Views.Slider extends Saturdays.View


	current_slide: 0



	
	initialize: ->
		this.events["click [data-next-slide-button]"] = "next_slide"
		this.events["click [data-previous-slide-button]"] = "previous_slide"
		this.events["click [data-slide-marker]"] = "slide_to"
		this.events["click [data-hide]"] = "hide"

		super()

		



	render: ->

		_.extend @data,
			current_slide: @current_slide

		super()

		@previous_slide_height = this.$el.find("[data-slide="+@current_slide+"] [data-slide-content]").height()
		this.$el.find("[data-slider-container]").css "height", "-="+(this.$el.find("[data-slide="+@current_slide+"]").height() - @previous_slide_height)+"px"
		this.$el.find("[data-slide]").css "transform", "translateX(-"+@current_slide+"00%)"

		this



	next_slide: ->
		this.slide_to(null, @current_slide + 1)


	previous_slide: ->
		this.slide_to(null, @current_slide - 1)


	slide_to: (e, index)->
		if e?
			index = parseInt(e.currentTarget.getAttribute "data-slide-marker")
			e.preventDefault()
			e.currentTarget.blur()

		@current_slide = index
		this.$el.find("[data-slide-marker]").removeClass "slider__marker--active"
		this.$el.find("[data-slide-marker="+@current_slide+"]").addClass "slider__marker--active"

		slide_height = this.$el.find("[data-slide="+@current_slide+"] [data-slide-content]").height()
		this.$el.find("[data-slider-container]").css "height", "-="+(@previous_slide_height - slide_height)+"px"

		@previous_slide_height = slide_height

		this.$el.find("[data-slide]").css "transform", "translateX(-"+@current_slide+"00%)"
		setTimeout =>
			this.$el.find("[data-slide="+@current_slide+"] input:not([disabled]):first").focus()
		, 333


	show: (e, index=0)->
		if e?
			e.preventDefault()

		this.current_slide = index
		this.render()
	
		this.$el.removeClass "fade_out"


	hide: (e)->
		if e?
			e.preventDefault()
		
		this.$el.addClass "fade_out"
		




