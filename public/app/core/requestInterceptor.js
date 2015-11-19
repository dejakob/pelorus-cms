angular.module('pelorus.factories')
    .factory('requestInterceptor', [

        '$q',
        '$rootScope',

        /*
            TODO: Handle http status codes
        */

        function($q, $rootScope) {
            return {
                'responseError': function(rejection) {
                    switch(rejection.status) {
                        case 0:
                            // Content blocked by client.
                            break;
                        case 401:
                            break;
                        case 404:
                            break;
                        default:
                            break;
                    }
                    return $q.reject(rejection);
                }
            };
        }
    ]);
