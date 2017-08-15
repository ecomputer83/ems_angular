'use strict'
app.controller('Employees', function ($scope, $location, $http, Service) {
    $http.get('http://localhost:83/api/Employees').success(function (response) {
        $scope.employees = response;
        
        for (var i = 0; i < $scope.employees.length; i++) {
            var positions = "";
            for (var j = 0; j < $scope.employees[i].Positions.length; j++) {
                if (j == 0) {
                    positions = $scope.employees[i].Positions[j].PositionName;
                } else {
                    positions = positions + " / " + $scope.employees[i].Positions[j].PositionName;
                }
            }
            $scope.employees[i].Positions = positions;
        }
       
    });
    $scope.remove = function (id) {
        Service.DeleteEmployee(id).then(function (response) {
            $http.get('http://localhost:83/api/Employees').success(function (response) {
                $scope.employees = response;

                for (var i = 0; i < $scope.employees.length; i++) {
                    var positions = "";
                    for (var j = 0; j < $scope.employees[i].Positions.length; j++) {
                        if (j == 0) {
                            positions = $scope.employees[i].Positions[j].PositionName;
                        } else {
                            positions = positions + " / " + $scope.employees[i].Positions[j].PositionName;
                        }
                    }
                    $scope.employees[i].Positions = positions;
                }
            });
        })
    }
});
app.controller('NewEmployee', function ($scope, $location, Service) {
    var positions = [];
    $scope.Register = function () {
        for (var i = 0; i < $scope.position.length; i++) {
            var position = {
                PositionId: 0,
                EmployeeId: 0,
                PositionName: $scope.position[i]
            }
            positions.push(position)
        }
        var registration = {
                LastName: $scope.lname,
                FirstName: $scope.fname,
                DOB: $scope.dob,
                Positions: positions,
            EmployeeDependencies: {
                LastName: $scope.lname_g,
                FirstName: $scope.fname_g,
                DOB: $scope.dob_g,
                Relation: $scope.relation
            }
        };
        var fData = new FormData();
        fData.append("EmployeeViewModels", registration);
        Service.AddEmployee(registration).then(function (response) {
            $scope.savedSuccessfully = true;
            $location.path('/Employee');
        },
    function (response) {
        $scope.message = "Failed to add Employee";
    });
    }
});

app.controller('UpdateEmployee', function ($scope, $location, Service, $routeParams, $http) {

    $http.get('http://localhost:83/api/Employees/'+$routeParams.id).success(function (response) {
        $scope.registration = response;
        $scope.positions = [];
        for (var j = 0; j < $scope.registration.Positions.length; j++) {
            $scope.positions.push($scope.registration.Positions[j].PositionName);
        }
        $scope.registration.DOB = $scope.registration.DOB + ".000Z";
        $scope.registration.EmployeeDependencies.DOB = $scope.registration.EmployeeDependencies.DOB + ".000Z";
    });


    var positionz = [];
    $scope.Update = function () {
        for (var i = 0; i < $scope.positions.length; i++) {
            var position = {
                PositionId: $scope.registration.Positions[i].PositionId,
                EmployeeId: $scope.registration.EmployeeId,
                PositionName: $scope.positions[i]
            }
            positionz.push(position)
        }
        $scope.registration.Positions = positionz;
        Service.EditEmployee($routeParams.id, JSON.stringify($scope.registration)).then(function (response) {
            $scope.savedSuccessfully = true;
            $location.path('/Employee');
        },
    function (response) {
        $scope.message = "Failed to add Employee";
    });
    }
});