angular.module('pelorus.directives')
    .directive('header', [

        function() {
            return {
                templateUrl: 'app/core/header/header.html',
                replace: true,
                restrict: 'AE',
                link: function($scope, $el, attr) {

                }
            };
        }
    ]);
