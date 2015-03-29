Router.route('/', {
  name: 'home',
  controller: 'HomeController'
});

Router.route('/register', {
  name: 'register',
  controller: "RegisterController",
});

Router.route('/email_validation', {
  name: 'email_validation',
  controller: "EmailValidationController",
});

