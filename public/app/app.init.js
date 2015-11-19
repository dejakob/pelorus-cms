// The application starts here
// The callback on the document-ready event gets the configuration-files it needs, then bootstraps the app.

angular.element(document).ready(function () {

    /*
        TODO: automate versions
    */
    console.info('Welcome to Pelorus CMS (v0.0.1)');
    console.info('Loading configuration...');

    var configuration, modules;

    var getConfiguration = function getConfiguration () {
        var deferred = new $.Deferred();

        $.get('app/config/config.json', function (configdata) {
            configuration = configdata;
            deferred.resolve();
        });

        return deferred;
    };

    var getModules = function getModules () {
        var deferred = new $.Deferred();

        $.get('app/config/system/modules.json', function (moduledata) {
            modules = moduledata;
            deferred.resolve();
        });

        return deferred;
    };

    $.when(getConfiguration(), getModules()).done(function () {
        console.info('Loaded system configuration succesfully!');

        console.info('Verifying setup...');

        angular.module('pelorus').config(['configurationProvider', 'appModulesProvider', function (configurationProvider, appModulesProvider) {
            configurationProvider.setConfiguration(configuration);
            appModulesProvider.setConfiguration(modules);
        }]);

        angular.bootstrap(document, ['pelorus']);
    });


/*    $.get('app/config/config.json', function (configdata) {

        console.info('Loaded system configuration succesfully!');

        $.get('app/config/system/modules.json', function (moduledata) {

            console.info('Verifying setup...');

            angular.module('pelorus').config(['configurationProvider', function (configurationProvider) {
                configurationProvider.setConfiguration(configdata);
                //moduleProvider.setConfiguration(moduledata);
            }]);

        }).fail(function(error){
            console.warn('Unable to load the module configuration. Please make sure a proper config file is present (public/app/config/system/modules.js)');
        });

        angular.bootstrap(document, ['pelorus']);
    }).fail(function(error){

        console.warn('Unable to load the configuration. Please make sure a proper config file is present (public/app/config/config.js)');

    });*/

});
