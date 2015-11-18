angular.module('pelorus.services')
    .service('NotificationService', [
        'ngNotify',
        '$rootScope',
        function NotificationService(ngNotify, $rootScope) {

            /* Notification adapter, currently designed to work with https://github.com/matowens/ng-notify */

            var API = {};

            $rootScope.$on('Authentication.authenticated', function () {

                /*Notification removed since it would trigger each time visiting the cms with an active session*/
                /*ngNotify.set("Login successful", {
                    position: 'top',
                    type: 'success',
                    html: true
                });*/
            });

            return API;
        }
    ]);
