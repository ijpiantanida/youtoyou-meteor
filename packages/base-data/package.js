Package.describe({
  name: 'base-data',
  version: '0.1.0',
  summary: 'Data definitions for the app'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');

  var packagesToUse = {
    both: [
      /* Core */
      'accounts-base',
      'underscore',
      /* Package server */
      'aldeed:collection2@2.3.2',
      'dburles:collection-helpers@1.0.2',
      'matb33:collection-hooks@0.7.11'
    ],
    client: [
    ],
    server: [
    ]
  };

  api.use(packagesToUse.both);
  api.imply(packagesToUse.both);
  api.use(packagesToUse.client, 'client');
  api.imply(packagesToUse.client, 'client');
  api.use(packagesToUse.server, 'server');
  api.imply(packagesToUse.server, 'server');

  api.addFiles('schemas.js');
  api.export('Schemas');

  api.addFiles('collections/user.js');
  api.export('Users');
  api.addFiles('collections/video.js');
  api.export('Videos');
  api.addFiles('collections/like.js');
  api.export('Likes');
});
