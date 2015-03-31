Router.route('/', {
  name: 'home',
  controller: 'HomeController'
});

Router.route('/register', {
  name: 'register',
  controller: "RegisterController",
});
