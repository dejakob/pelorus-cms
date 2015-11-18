angular.module('pelorus.factories')
    .factory('userFactory', [

        '$resource',
        'configuration',

        function($resource, configuration) {

            //
            // FACTORY PROPERTIES --------------------------------------
            //

            var api = configuration.serverPath + '/api/' + configuration.apiLevel,
                factory = {};

            factory = $resource(api + '/user/:listController:id:objController/:docController', {
                id: "@id",
                listController: "@listController",
                docController: "@docController",
                objController: "@objController"
            }, {
                getProfile: {
                    method: 'GET',
                    params: {
                        objController: 'profile'
                    }
                },
                logout: {
                    method: 'GET',
                    params: {
                        objController: 'logout'
                    }
                }
            });

            return factory;
        }
    ]);
