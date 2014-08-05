var app = app || {};

(function() {
	var TimeEntry = Backbone.Model.extend({
			// no '_' here on purpose
		type: 'timeentry',

		defaults: {
			date_ts: null,
			from_ts: null,
			until_ts: null,
			span: null,
			note: ''
		}

	});

	app.TimeEntry = TimeEntry;
})();