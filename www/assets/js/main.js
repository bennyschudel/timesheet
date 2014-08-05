"use strict";
// initialize Hoodie
//var hoodie  = new Hoodie();


Backbone.connect();

var hoodie = Backbone.hoodie;

var $inputmask = $('#inputmask');

$inputmask.on('submit', function(evt) {
	var els = this.elements;

	function makeDate(date_, str) {
		var value = str.split(/[^\d]+/);
		var date = date_.clone();

		return date.hours( value[0] ).minutes( value[1] );
	}

	function parseDate(str) {
		return moment(str, ['MM-DD-GG', 'MM-DD-GGGG', 'DD.MM.GG', 'DD.MM.GGGG']).startOf('day');
	}

	var date = parseDate(els.date.value);
	var from = makeDate(date, els.from.value);
	var until = makeDate(date, els.until.value);

	var obj = {
		date_ts: date.unix(),
		from_ts: from.unix(),
		until_ts: until.unix(),
		span: until.diff(from, 'seconds'),
		note: els.note.value
	};

	app.time_sheet.create(obj);

//
//	var timeentry = new TimeEntry(obj);
//	timeentry.save();
});


/*
// Timeline Collection/View
function Timeline($element) {
	var collection = [];
	var $el = $element;

	// Handle marking timeblock as "done"
	$el.on('click', 'input[type=checkbox]', function() {
		hoodie.store.remove('timeblock', $(this).parent().data('id'));
		return false;
	});

	// Handle "inline editing" of a timeblock.
	$el.on('click', 'label', function() {
		$(this).parent().parent().find('.editing').removeClass('editing');
		$(this).parent().addClass('editing');
		return false;
	});

	// Handle updating of an "inline edited" timeblock.
	$el.on('keypress', 'input[type=text]', function(event) {
		if (event.keyCode === 13) {
			hoodie.store.update('timeblock', $(this).parent().data('id'), {title: event.target.value});
		}
	});

	// Find index/position of a timeblock in collection.
	function getTimeblockItemIndexById(id) {
		for (var i = 0, len = collection.length; i < len; i++) {
			if (collection[i].id === id) {
				return i;
			}
		}
		return null;
	}

	function paint() {
		$el.html('');

		collection.sort(function(a, b) {
			return ( a.createdAt > b.createdAt ) ? 1 : -1;
		});

		function formatSpan(val) {
			var h = Math.floor(val / 3600);
			var m = Math.floor((val - (h * 3600)) / 60);

			return [h, ('0'+m).slice(-2)].join('.');

		}

		var html = '';

		collection.forEach(function(item, i) {
			html += '' +
				'<li data-id="' + item.id + '">' +
					'<input type="text" value="' + moment(item.date_ts * 1e3).format('D') + '" readonly>' +
					'<input type="text" value="' + moment(item.from_ts * 1e3).format('HH:mm') + '" readonly>' +
					'<input type="text" value="' + moment(item.until_ts * 1e3).format('HH:mm') + '" readonly>' +
					'<input type="text" value="' + formatSpan(item.span)+'" readonly>' +
				'</li>';
		});

		$el.html(html);
	}

	this.add = function(timeblock) {
		collection.push(timeblock);
		paint();
	};

	this.update = function(timeblock) {
		collection[getTimeblockItemIndexById(timeblock.id)] = timeblock;
		paint();
	};

	this.remove = function(timeblock) {
		collection.splice(getTimeblockItemIndexById(timeblock.id), 1);
		paint();
	};

	this.clear = function() {
		collection = [];
		paint();
	};
}

// Instantiate Timeline collection & view.
var timeline = new Timeline($('#timeline'));

// initial load of all timeblock items from the store
hoodie.store.findAll('timeentry')
	.then(function(data) {
		console.log(data);
		data.forEach(timeline.add);
	});

// when a timeblock changes, update the UI.
hoodie.store.on('add:timeentry', timeline.add);
hoodie.store.on('update:timeentry', timeline.update);
hoodie.store.on('remove:timeentry', timeline.remove);
// clear timeline when user logs out,
hoodie.account.on('signout', timeline.clear);


var $inputmask = $('#inputmask');
$inputmask.on('submit', function(evt) {
	var els = this.elements;

	function makeDate(date_, str) {
		var value = str.split(/[^\d]+/);
		var date = date_.clone();

		return date.hours( value[0] ).minutes( value[1] );
	}

	function parseDate(str) {
		return moment(str, ['MM-DD-GG', 'MM-DD-GGGG', 'DD.MM.GG', 'DD.MM.GGGG']).startOf('day');
	}

	var date = parseDate(els.date.value);
	var from = makeDate(date, els.from.value);
	var until = makeDate(date, els.until.value);

	var obj = {
		date_ts: date.unix(),
		from_ts: from.unix(),
		until_ts: until.unix(),
		span: until.diff(from, 'seconds')
	};

	//hoodie.store.add('timeblock', obj);
	var time_entry = new TimeEntry(obj);
	time_entry.save();
});


$('#timeblockinput').on('keypress', function(event) {
	// ENTER & non-empty.
	if (event.keyCode === 13 && event.target.value.length) {
		hoodie.store.add('timeblock', {title: event.target.value});
		event.target.value = '';
	}
});

*/