var app = app || {};

$(function() {
	'use strict';

	app.user_management = new app.UserManagement();
	app.time_sheet = new app.TimeSheet();

	app.view = new app.AppView();
});