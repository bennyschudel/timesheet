!function() {

	var $modals = $('#modals');

	$.modalForm = function(id) {
		var $modal = $('#modal-'+id);
		var $form  = $modal.find('form');

		$modals.find('.modal').hide();

		$modals.show();
		$modal.show();

		$form.on('submit', function(event){
			event.preventDefault();
			event.stopPropagation();

			var inputs = {};
			var $form = $(event.target);

			_.each(event.target.elements, function (el) {
				if (!el.name) { return; }

				inputs[el.name] = el.value;
			});

			$modal.trigger('submit', inputs);
		});

		$modal.on('error', function(event, error) {
			$modal.find('.alert').remove();
			$modal.find('.modal__body').before('<div class="alert alert--error">'+error.message+'</div>');
		});

		$modal.on('shown', function() {
			$modal.find('input').eq(0).focus();
		});

		return $modal;
	};

}( window.jQuery );


$(function () {
	var handleSubmit;

	var $modals = $('#modals');

	$('body').on('click', '[data-hoodie-action]', function(event) {
		var $el    = $(event.target);
		var action = $el.data('hoodie-action');
		var $modal;

		switch(action) {
			case 'signup':
				$modal = $.modalForm('signup');
				break;
			case 'signin':
				$modal = $.modalForm('signin');
				break;
			case 'resetpassword':
				$modal = $.modalForm('resetpw');
				break;
			case 'changepassword':
				$modal = $.modalForm('changepw');
				break;
			case 'signout':
				app.user_management.signOut();
				break;
		}

		if ($modal) {
			$modal.on('submit', function(event, data) {
				var p = app.user_management.doAction(action, data);

				p.done(function() {
					$modals.hide();
				})
				.fail(function(err) {
					$modal.trigger('error', err);
				});
			});
		}
	});
});