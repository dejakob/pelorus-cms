angular.module('pelorus.controllers')
    .controller('AuthenticationController', [

        '$scope',
        'Authentication',
        '$state',
        '$rootScope',

        function($scope, Authentication, $state, $rootScope) {

            /**
             * Trigger oAuth module to start authenticating using the preferred provider (set in config.js)
             */
            $scope.handleLogin = function handleLogin () {
                Authentication.goToOauth();
            };

            /**
             * Actions that need to be done when the controller starts
             */
            var initialize = function initialize () {
                if (Authentication.authenticated) {

                    // Already authenticated
                    $state.go('home');

                } else {

                    $rootScope.$on('Authentication.authenticated', function () {

                        // Authentication succeeded, redirect to default route

                        /*
                            TODO: redirect to the page the user was targetting before he needed to login.
                        */

                        $state.go('home');
                    });
                }
            };

            initialize();

        }
    ]);
