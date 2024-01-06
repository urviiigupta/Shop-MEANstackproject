var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http,$window) {
 
     $scope.arritems=[];
     let obj={};
    obj.itemname="";
    obj.rate=0;
    $scope.arritems.push(obj);

    $scope.additem=function()
    {
        let obj={};
        obj.itemname="";
        obj.rate=0;
     
    
        $scope.arritems.push(obj);
    }

    $scope.saveitems=function()
    {

        const apiUrl = 'http://localhost:5000/items/api/items';

// Create an object with the data you want to send
const requestData = {

   arritems:$scope.arritems,
    
};


console.log(requestData)
// Make the fetch API call with the appropriate headers and method
fetch(apiUrl, {
method: 'POST',
headers: {
    'Content-Type': 'application/json', // Specify that you're sending JSON data
    // Add any other headers as needed
},
body: JSON.stringify(requestData), // Convert the data to a JSON string
})
.then(response => response.json())
.then(data => {
    // Handle the response data
    console.log('Response:', data);
    alert ("Data saved");

    // document.getElementById('itemname').value="";
    // document.getElementById('rate').value="";

    $scope.arritems=[];
   

})
.catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error:', error);
});


    }

});