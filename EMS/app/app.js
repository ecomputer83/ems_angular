var app = angular.module("EmsApp", ['ngRoute']);
app.config(function($routeProvider){
    $routeProvider.when("/NewEmployee", {
        controller: "NewEmployee",
        templateUrl: "app/Views/newemployee.html"
    });
    $routeProvider.when("/UpdateEmployee/:id", {
        controller: "UpdateEmployee",
        templateUrl: "app/Views/editemployee.html"
    });
    $routeProvider.when("/Employee", {
        controller: "Employees",
        templateUrl: "app/Views/employee.html"
    });
    $routeProvider.when("/home", {
        controller: "Home",
        templateUrl: "app/Views/home.html"
    })
    $routeProvider.otherwise({redirectTo: '/home'})
});
app.config(function($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.interceptors.push('authInterceptorService');
});
app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);