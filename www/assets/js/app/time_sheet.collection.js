var app = app || {};

(function() {
	var TimeSheet = Backbone.Collection.extend({

		model: app.TimeEntry,

		comparator: function(item) {
			return -item.get('from_ts');
		}

	});

	app.TimeSheet  = TimeSheet;
})();