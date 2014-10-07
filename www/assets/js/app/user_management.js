var app = app || {};

(function() {

	function UserManagement() {
		this.subscribeToHoodieEvents();

		hoodie.account.authenticate()
			.then(
				this.handleUserAuthenticated.bind(this),
				this.handleUserUnauthenticated.bind(this)
		);
	}

	UserManagement.prototype.subscribeToHoodieEvents = function() {
		hoodie.account.on('signin reauthenticated', this.handleUserAuthenticated.bind(this));
		hoodie.account.on('signout', this.handleUserUnauthenticated.bind(this));

		hoodie.on('account:error:unauthenticated remote:error:unauthenticated', this.handleUserAuthenticationError.bind(this));
	};

	UserManagement.prototype.setUserStatus = function(status) {
		$('html').attr('data-hoodie-account-status', status);

		return this;
	};

	UserManagement.prototype.handleUserUnauthenticated = function() {
		return this.setUserStatus('signedout')
	};

	UserManagement.prototype.handleUserAuthenticated = function(username) {
		this.setUserStatus('signedin');

		$('.hoodie-username').text(username);

		return this;
	};

	UserManagement.prototype.handleUserAuthenticationError = function() {
		return this.setUserStatus('signedout');
	};


	UserManagement.prototype.doAction = function(action, data) {
		var actionMap = {
			'signup'  : 'signUp',
			'signin'  : 'signIn',
			'resetpw' : 'resetPassword',
			'changepw': 'changePassword'
		};

		return this[ actionMap[action] ].call(this, data);
	};

	UserManagement.prototype.signIn = function(data) {
		var p = hoodie.account.signIn(data.username, data.password);

		return p;
	};

	UserManagement.prototype.signOut = function() {
		var p = hoodie.account.signOut();

		return p;
	};

	UserManagement.prototype.signUp = function(data) {
		var p = hoodie.account.signUp(data.username, data.password);

		return p;
	};

	UserManagement.prototype.changePassword = function(data) {
		var p = hoodie.account.changePassword(null, data.new_password);

		return p;
	};

	UserManagement.prototype.resetPassword = function(data) {
		var p = hoodie.account.resetPassword(data.email);

		return p;
	};

	app.UserManagement = UserManagement;

})();
