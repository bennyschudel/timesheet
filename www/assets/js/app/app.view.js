var app = app || {};

(function() {
	var AppView = Backbone.View.extend({

		el: '#app',

		events: {},

		initialize: function() {
			this.$time_sheet = this.$('.time_sheet');
			this.$list = this.$time_sheet.find('.time_sheet__list');

			this.listenTo(app.time_sheet, 'add', this.addTimeEntry);
			this.listenTo(app.time_sheet, 'reset', this.addAllTimeEntries);
			this.listenTo(app.time_sheet, 'all', this.render);

			app.time_sheet.fetch();
		},

		render: function() {
			return this;
		},

		addTimeEntry: function(entry) {
			var view = new app.TimeEntryView({ model: entry });
			this.$list.append( view.render().el );
		},

		addAllTimeEntries: function() {
			app.time_sheet.each(this.addTimeEntry, this);
		}

	});

	app.AppView = AppView;
})();