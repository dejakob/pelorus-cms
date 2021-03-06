// The application starts here
// The callback on the document-ready event gets the configuration-files it needs, then bootstraps the app.

angular.element(document).ready(function () {

    /*
        TODO: automate versions
    */
    console.info('Welcome to Pelorus CMS (v{APP_VERSION})');
    console.info('Loading configuration...');

    $.get('app/config/config.json', function (data) {

        console.info('Loaded configuration succesfully!');
        console.info('Verifying setup...');

        angular.module('pelorus').config(['configurationProvider', function (configurationProvider) {
            configurationProvider.setConfiguration(data);
        }]);

        angular.bootstrap(document, ['pelorus']);
    }).fail(function(error){

        console.warn('Unable to load the configuration. Please make sure a proper config file is present (public/app/config/config.js)');

    });
});
