var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {
    $scope.showDetails=false
    $scope.getdata=function()
    {   
        const apiUrl = 'http://localhost:5000/summary/api/summary';

        // Create an object with the data you want to send

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Specify that you're sending JSON data
            // Add any other headers as needed
        }
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
           $scope.itemarray=res
           $scope.showDetails=true

        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
        });
    }
});