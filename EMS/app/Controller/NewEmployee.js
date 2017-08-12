'use strict'
app.controller('NewEmployee', function ($scope, $location, Service) {
    var registration = {
        employee: {
            LastName: $scope.lname,
            FirstName: $scope.fname,
            DOB: $scope.dob,
            
            
        },
        Positions: [
              {
                  PositionName: Scope.postion
              }
        ],
        Dependency: {
            LastName: $scope.lname_g,
            FirstName: $scope.fname_g,
            DOB: $scope.dob_g,
            Relation: $scope.relation
        }
    };
    $scope.Register = function () {
        var fData = new FormData();
        fData.append("EmployeeViewModels", registration);
        Service.AddEmployee(fData).then(function (response) {
            $scope.savedSuccessfully = true;
        $location.path('/Employee');
    },
    function(response){
        $scope.message = "Failed to add Employee";
    });
    }
})