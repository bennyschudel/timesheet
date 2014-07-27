var app = app || {};

(function() {
	var Utils = function() {};
	var UtilsProto = Utils.prototype;

	UtilsProto.formatHours = function(val) {
		var h = Math.floor(val / 3600);
		var m = Math.floor((val - (h * 3600)) / 60);

		return [h, ('0'+m).slice(-2)].join('.');
	};

	app.utils = new Utils();
})();