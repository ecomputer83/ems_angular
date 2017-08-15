'use strict'
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
            employee: {
                LastName: $scope.lname,
                FirstName: $scope.fname,
                DOB: $scope.dob,


            },
            position: positions,
            employeeDependency: {
                LastName: $scope.lname_g,
                FirstName: $scope.fname_g,
                DOB: $scope.dob_g,
                Relation: $scope.relation
            }
        };
        var fData = new FormData();
        fData.append("EmployeeViewModels", registration);
        alert(JSON.stringify(registration));
        Service.AddEmployee(registration).then(function (response) {
            $scope.savedSuccessfully = true;
        $location.path('/Employee');
    },
    function(response){
        $scope.message = "Failed to add Employee";
    });
    }
})