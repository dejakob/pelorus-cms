angular.module('pelorus')
    .config([

        '$urlRouterProvider',
        '$stateProvider',
        '$locationProvider',
        '$urlMatcherFactoryProvider',

        function($urlRouterProvider, $stateProvider, $locationProvider, $urlMatcherFactoryProvider) {

            // For any unmatched url:redirect to home
            $urlRouterProvider.otherwise('/');

            // Use the HTML5 History API
            $locationProvider.html5Mode(true);

            //
            // STATES --------------------------------------------------
            //

            $stateProvider

            //
            // HOME --------------------------------------------------------
            //
            .state('home', {
                url: '/',
                access: {
                    requiresLogin: true,
                    permissionCheckType: 0
                },
                ncyBreadcrumb: {
                    label: 'Home'
                },
                views: {
                    '': {
                        template: 'Hello World'
                    }
                }
            })


            //
            // AUTHENTICATION
            //

            .state('authentication', {
                url: '/authentication',
                data: {
                },
                resolve: {},
                views: {
                    '': {
                        templateUrl: 'app/modules/auth/views/authentication-view.html',
                        controller: 'AuthenticationController'
                    }
                }
            })

            .state('loggedin', {
                url: '/logged-in',
                access: {
                    requiresLogin: true
                },
                controller: ['Authentication', '$log', function(Authentication, $log) {
                    if (Authentication.Authenticated()) {
                        $log.log('Authentication succeeded, should move on to home screen now');
                    } else {
                        $log.log('Authentication was not yet performed');
                    }
                }]
            })

            ;
        }
    ]);
