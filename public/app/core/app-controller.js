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
            $scope.Authentication = Authentication;

        }
    ]);
