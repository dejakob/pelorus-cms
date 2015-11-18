angular.module('pelorus.controllers')
    .controller('AuthenticationController', [

        '$scope',
        'Authentication',

        function($scope, Authentication) {

            /**
             * Trigger oAuth module to start authenticating using the preferred provider (set in config.js)
             */
            $scope.handleLogin = function handleLogin () {
                Authentication.goToOauth();
            };

        }
    ]);
