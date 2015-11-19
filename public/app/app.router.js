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
                        templateUrl: 'app/components/home/home.html',
                        controller: 'HomeController'
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
                url: '/auth/callback-success',
                access: {
                    requiresLogin: true
                },
                controller: ['Authentication', '$log', '$rootScope', '$state', function(Authentication, $log, $rootScope, $state) {
                    if (Authentication.Authenticated()) {
                        $log.log('Authentication succeeded, should move on to home screen now');
                    } else {

                        $rootScope.$on('Authentication.authenticated', function () {
                            // Authentication succeeded, redirect to default route

                            /*
                                TODO: redirect to the page the user was targetting before he needed to login.
                            */

                            $state.go('home');
                        });

                        $rootScope.$on('Authentication.authenticationFailed', function () {
                            // Authentication failed, redirect to login form

                            $state.go('authentication');
                        });
                    }
                }]
            })

            ;
        }
    ]);
