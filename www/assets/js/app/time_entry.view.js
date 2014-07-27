var app = app || {};

(function() {
	var TimeEntryView = Backbone.View.extend({

		tagName: 'li',

		className: 'time_entry',

		events: {},

		template: _.template( $('#time_entry_tpl').html().replace(/[\t\n\r]+/g, '') ),

		initialize: function() {
			this.listenTo(this.model, 'change', this.render);
		},

		render: function() {
			var html = this.template(this.model.attributes);
			this.$el.html(html);

			return this;
		}

	});

	app.TimeEntryView = TimeEntryView;
})();