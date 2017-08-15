'use strict';
app.factory('Service', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
    var serviceBase = 'http://localhost:83/';

    var ServiceFactory = {};
    var _authentication = {
        isAuth: false,
        userName: ""
    };

    var _saveRegistration = function (registration) {
        // _logOut();
        return $http.post(serviceBase + 'api/Account/Register', registration, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function (response) {
            return response;
        });
    };
    var _stages = function (stage) {
        // _logOut();
        return $http.post(serviceBase, stage, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
            return response;
        });
    };
    var _AddEmployee = function (registration) {
        return $http.post(serviceBase + 'api/Employees', JSON.stringify(registration), {
            transformRequest: angular.identity,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response;
        })
    }
    var _EditEmployee = function (id, registration) {
        return $http.post(serviceBase + 'api/Employees/'+id, registration, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            return response;
        })
    }
    var _login = function (loginData) {

        var deferred = $q.defer();
        $http.post(serviceBase, loginData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

            deferred.resolve(response);
        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });
        return deferred.promise;
    };
    //var _logOut = function () {
    //    $rootScope.token = "";
    //    $rootScope.username = "";

    //    _authentication.isAuth = false;
    //    _authentication.userName = "";
    //    $rootScope.isAuth = false;
    //    localStorage.removeItem('authentication'); localStorage.removeItem('user');
    //};
    //var _fillAuthData = function () {
    //    var authData = localStorage.getItem('authorizationData');
    //    if (authData) {
    //        _authentication.isAuth = true;
    //        var authDatas = localStorage.getItem('userName');
    //        _authentication.userName = authDatas;
    //    }
    //}
    var _Employee = function (id) {
        return $http.get(serviceBase + 'api/Employees/' + id).success(function (response) {
            return response;
        })

    }
    var _DeleteEmployee = function (id) {
        return $http.delete(serviceBase + 'api/Employees/' + id).success(function (response) {
            return response;
        })

    }
    var _Employees = function () {
        return $http.get(serviceBase + 'api/Employees').success(function (response) {
            return response;
        })

    }
    var _MerchantSetting = function (id) {
        var deferred = $q.defer();
        $http.get('http://localhost:24325/api/Admin/GetMerchantSettingById?id=' + id).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        })
        return deferred.promise;
    }

    var _Member = function () {
        var deferred = $q.defer();
        $http.get(serviceBase, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
            deferred.resolve(response);
        }).error(function (err, status) {
            deferred.reject(err);
        })
        return deferred.promise;
    }
    ServiceFactory.saveRegistration = _saveRegistration;
    ServiceFactory.stages = _stages;

    ServiceFactory.login = _login;
    //ServiceFactory.logOut = _logOut;
    //ServiceFactory.fillAuthData = _fillAuthData;
    ServiceFactory.authentication = _authentication;
    ServiceFactory.Employee = _Employee;
    ServiceFactory.DeleteEmployee = _DeleteEmployee;
    ServiceFactory.AddEmployee = _AddEmployee;
    ServiceFactory.User = _Member;
    ServiceFactory.EditEmployee = _EditEmployee;
    ServiceFactory.Employees = _Employees;
    return ServiceFactory;
}])