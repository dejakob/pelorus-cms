'use strict';

require('rootpath')();
var userController = require('app/controllers/users'),
    config = require('config/config'),
    baseUrl = config.api.prefix + config.api.version + 'user';

module.exports = function(app) {
    app.route(baseUrl + '/profile').get(userController.profile);
    app.route(baseUrl + '/logout').get(userController.logout);

    /*
        DO NOT USE IN PRODUCTION !
    */
    if (process.env.NODE_ENV.toLowerCase() !== 'production') {
        app.route(baseUrl + '/dummy').get(userController.dummy);
    }
};
