angular.module('pelorus.controllers')
    .controller('appController', [
        '$scope',
        '$rootScope',
        '$log',
        'NotificationService',
        'Authentication',
        function($scope, $rootScope, $log, NotificationService, Authentication) {

            /**
             * Exposes the authentication status to the application scope
             * @type {boolean}
             */
            $scope.authenticated = Authentication.Authenticated();

            // Listen to authentication event
            $rootScope.$on('Authentication.authenticated', function() {
                $scope.authenticated = Authentication.Authenticated();
            });

            $rootScope.$on('Authentication.terminated', function() {
                $scope.authenticated = Authentication.Authenticated();
            });

        }
    ]);
