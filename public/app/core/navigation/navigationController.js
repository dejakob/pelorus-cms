angular.module('pelorus.directives')
    .directive('navigation', [

        function() {
            return {
                templateUrl: 'app/core/navigation/navigation.html',
                replace: true,
                restrict: 'AE',
                link: function($scope, $el, attr) {

                }
            };
        }
    ]);
