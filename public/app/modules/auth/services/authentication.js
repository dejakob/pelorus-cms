angular.module('district01.services.auth', []);
angular.module('district01.services.auth')
    .factory('Authentication', [
        '$http',
        'configuration',
        '$window',
        '$log',
        'userFactory',
        '$rootScope',
        function ($http, configuration, $window, $log, userFactory, $rootScope) {
            var API = {};

            var _authenticated = false,
                _userData = {}
                oAuthProviders = {
                    'twitter': '/auth/twitter'
                };

            /* GETTERS AND SETTERS */

            /**
             * Gets the authentication status
             * @return {[boolean]} [Authenticated or not authenticated]
             */
            API.Authenticated = function getAuthenticated() {
                return _authenticated;
            };

            /**
             * Gets the current user
             * @return {[object]} [The current user object]
             */
            API.getCurrentLoginUser = function getCurrentLoginUser() {
                return _userData;
            };

            API.identify = function identify () {
                $log.log('Identification in progress');

                userFactory.getProfile(function success (data) {
                    $log.log('data', data);

                    // Store user data in Authentication singleton
                    _userData = data.profile;

                    // Emit Authentication Event
                    $rootScope.$emit('Authentication.authenticated');

                }, function error (data) {
                    _authenticated = false;
                    $rootScope.$emit('Authentication.authenticationFailed');
                });
            };

            /**
             * Asks the authentication service to start the oauth procedure.
             */
            API.goToOauth = function goToOauth() {
                $window.open(configuration.serverPath+oAuthProviders[configuration.oAuth.provider], '_self');
            };


            return API;
        }
    ]);
