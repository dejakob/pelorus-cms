angular.module('pelorus.directives')
    .directive('header', [

        'Authentication',
        '$state',

        function(Authentication, $state) {
            return {
                templateUrl: 'app/core/header/header.html',
                replace: true,
                restrict: 'AE',
                link: function($scope, $el, attr) {

                    $scope.userData = Authentication.getCurrentLoginUser();

                    $scope.logout = function logout () {
                        Authentication.logOut(function () {
                            $state.go('authentication');
                        });
                    };

                }
            };
        }
    ]);
