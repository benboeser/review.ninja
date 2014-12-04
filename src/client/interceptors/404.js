// *****************************************************
// 401 Interceptor
// *****************************************************

module.factory('404HttpResponseInterceptor', ['$q', '$location',
    function($q, $location) {
        return {
            responseError: function(rejection) {
                if (rejection.status === 404) {
                    $location.path('/error');
                }
                return $q.reject(rejection);
            }
        };
    }
])
.config(['$httpProvider',
    function($httpProvider) {
        $httpProvider.interceptors.push('404HttpResponseInterceptor');
    }
]);
