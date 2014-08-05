var app = app || {};

(function() {
	var TimeSheet = Backbone.Collection.extend({

		model: app.TimeEntry,

		comparator: function(item) {
			return [-item.get('date_ts'), item.get('date_from')];
		}

	});

	app.TimeSheet  = TimeSheet;
})();