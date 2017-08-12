'use script'
app.factory('authInterceptorService', ['$q', '$location', function($q, $location){
    var authInterceptorServiceFactory = {};
    var _request = function(config) {
        config.headers = config.headers || {};
        var authData = localStorage.getItem('authorizationData');
        if(authData){
            config.headers.Authorization = 'Bearer ' + authData;
        }
        return config
    }
    var _responseError = function (rejection){
        if(rejection.status == 401 || rejection.status == 400){
            $location.path('/Login');
        }
        return $q.reject(rejection);
    };

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;
    return authInterceptorServiceFactory;
}]);