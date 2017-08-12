var app = angular.module("EmsApp", ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider.when("/NewEmployee", {
        controller: "NewEmployee",
        templateUrl: "app/Views/newemployee.html"
    });
    $routeProvider.when("/home", {
        controller: "HomeController",
        templateUrl: "app/Views/home.html"
    })
    $routeProvider.otherwise({redirectTo: '/home'})
});
app.config(function($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.interceptors.push('authInterceptorService');
});