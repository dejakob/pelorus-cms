angular.module('pelorus.services')
    .service('NotificationService', [
        'ngNotify',
        '$rootScope',
        function NotificationService(ngNotify, $rootScope) {

            /* Notification adapter, currently designed to work with https://github.com/matowens/ng-notify */

            var API = {};

            $rootScope.$on('Authentication.authenticated', function () {
                ngNotify.set("Login successful", {
                    position: 'top',
                    type: 'success',
                    html: true
                });
            });

            return API;
        }
    ]);
