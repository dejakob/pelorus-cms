angular.module('pelorus.directives')
    .directive('header', [

        'Authentication',

        function(Authentication) {
            return {
                templateUrl: 'app/core/header/header.html',
                replace: true,
                restrict: 'AE',
                link: function($scope, $el, attr) {

                    $scope.userData = Authentication.getCurrentLoginUser();

                }
            };
        }
    ]);
