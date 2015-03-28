Router.route('/', {
  name: 'home',
  controller: 'HomeController'
});

Router.route('/download', {
  name: 'download',
  controller: "DownloadController",
  where: 'server'
});