var app = app || {};

$(function() {
	'use strict';

	app.time_sheet = new app.TimeSheet();

	new app.AppView();
});