angular.module('pelorus.services')
    .service('RouteAuthenticationService', [
        '$log',
        'Authentication',
        '$state',
        '$rootScope',
        function RouteAuthenticationService($log, Authentication, $state, $rootScope) {

            var API = {};

            /**
             * Checks if a certain user has the correct rights to visit a certain route
             */
            API.authorizeUserForRoute = function authorizeUserForRoute (event, toState, toParams, fromState, fromParams) {

                // Only test route if is configured to require authorisation
                if (toState.access!== undefined) {

                    if (Authentication.Authenticated()) {

                        /*
                            TODO: check user permission for this route
                        */

                    } else {

                        $rootScope.$on('Authentication.authenticated', function () {

                            /*
                                TODO: check user permission for this route
                            */

                        });

                        $rootScope.$on('Authentication.authenticationFailed', function () {
                            // Authentication failed, redirect to login screen
                            event.preventDefault();
                            $state.go('authentication');

                        });

                    }

                }

            };

            return API;
        }
    ]);
