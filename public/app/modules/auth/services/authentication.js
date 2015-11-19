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

            var oAuthProviders = {
                    'twitter': '/auth/twitter'
                };

            /**
             * Get the current user. Reference on singleton.
             * @type {object}
             */
            API.currentUser = {};

            /**
             * Get the authentication status. Reference on singleton.
             * @type {boolean}
             */
            API.authenticated = false;

            /**
             * Get user based on session cookie. Stores user data in authentication singleton in call is successful, emits event if successful or unsuccessful
             */
            API.identify = function identify () {
                $log.log('Identification in progress');

                userFactory.getProfile(function success (data) {

                    // Store user data in Authentication singleton
                    API.currentUser = data;
                    API.authenticated = true;

                    // Emit Authentication Event
                    $rootScope.$emit('Authentication.authenticated');

                }, function error (data) {
                    API.authenticated = false;
                    $rootScope.$emit('Authentication.authenticationFailed');
                });
            };

            /**
             * Asks the authentication service to start the oauth procedure.
             */
            API.goToOauth = function goToOauth() {
                $window.open(configuration.serverPath+oAuthProviders[configuration.oAuth.provider], '_self');
            };

            /**
             * Log out the user
             * @param  {Function} callback Callback to execute when the logout is successful
             */
            API.logOut = function logOut (callback) {
                userFactory.logout(function success (data) {

                    API.currentUser = {};
                    API.authenticated = false;

                    $rootScope.$emit('Authentication.authenticationEnded');

                    if (callback) {
                        callback();
                    };

                }, function error (error) {
                    /*
                        TODO: catch this event
                    */
                });
            };


            return API;
        }
    ]);
