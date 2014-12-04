var module = angular.module('app',
    ['ninja.filters',
     'ui.utils',
     'ui.router',
     'ui.bootstrap',
     'infinite-scroll',
     'ngSanitize']);

var filters = angular.module('ninja.filters', []);

// *************************************************************
// Delay start
// *************************************************************

angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
});

// *************************************************************
// States
// *************************************************************

module.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider) {

        $stateProvider

            //
            // Home state
            //
            .state('home', {
                url: '/',
                templateUrl: '/templates/home.html',
                controller: 'HomeCtrl'
            })

            //
            // Repo state (abstract)
            //
            .state('repo', {
                abstract: true,
                url: '/:user/:repo',
                template: '<section ui-view></section>',
                resolve: {
                    repo: ['$rootScope', '$stateParams', '$HUBService',
                        function($rootScope, $stateParams, $HUBService) {
                            return $HUBService.call('repos', 'get', {
                                user: $stateParams.user,
                                repo: $stateParams.repo
                            });
                        }
                    ]
                }
            })

            //
            // Repo master state (list of pull requests)
            //
            .state('repo.master', {
                url: '',
                templateUrl: '/templates/repo.html',
                controller: 'RepoCtrl',
                resolve: {
                    repo: ['repo', function(repo) {
                        return repo; // inherited from parent state
                    }]
                }
            })

            //
            // Repo settings state
            //
            .state('repo.settings', {
                url: '/settings',
                templateUrl: '/templates/settings.html',
                controller: 'SettingsCtrl',
                resolve: {
                    repo: ['repo', function(repo) {
                        return repo; // inherited from parent state
                    }]
                }
            })

            //
            // Pull request state (abstract)
            //
            .state('repo.pull', {
                abstract: true,
                url: '/pull/:number',
                templateUrl: '/templates/pull.html',
                controller: 'PullCtrl',
                resolve: {
                    repo: ['repo', function(repo) {
                        return repo; // inherited from parent state
                    }],
                    pull: ['$stateParams', '$HUBService',
                        function($stateParams, $HUBService) {
                            return $HUBService.wrap('pullRequests', 'get', {
                                user: $stateParams.user,
                                repo: $stateParams.repo,
                                number: $stateParams.number
                            });
                        }
                    ]
                }
            })

            //
            // Pull request issues state (abstract)
            //
            .state('repo.pull.issue', {
                abstract: true,
                templateUrl: '/templates/sidebar.html'
            })

            //
            // Pull request issues state (list of issues)
            //
            .state('repo.pull.issue.master', {
                url: '',
                templateUrl: '/templates/issue/list.html',
                controller: 'IssueListCtrl'
            })

            //
            // Pull request issue state
            //
            .state('repo.pull.issue.detail', {
                url: '/:issue',
                templateUrl: '/templates/issue/detail.html',
                controller: 'IssueDetailCtrl',
                resolve: {
                    issue: ['$HUBService', '$stateParams',
                        function($HUBService, $stateParams) {
                            return $HUBService.call('issues', 'getRepoIssue', {
                                user: $stateParams.user,
                                repo: $stateParams.repo,
                                number: $stateParams.issue
                            });
                        }
                    ]
                }
            })

            //
            // 404 Error page
            //
            .state('error', {
                url: '/error',
                templateUrl: '/templates/error/error.html'
            });

        $urlRouterProvider.otherwise('/');

        $locationProvider.html5Mode(true);

    }
])
.run(['$rootScope', '$state', '$stateParams',
    function($rootScope, $state, $stateParams) {
        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
            $state.go('error');
        });
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }
]);
