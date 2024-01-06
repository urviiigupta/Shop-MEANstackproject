var app = angular.module('myApp', []);
app.controller('customersCtrl', function($scope, $http) {

   
    $scope.objbill={};
    $scope.objbill.billno="";
    $scope.objbill.billdate="";
    $scope.objbill.customer="";
    $scope.objbill.arritems=[];
    $scope.objbill.totalamt=0;

    $scope.showModal = false;
  

  
    $scope.showitems=function()
    {
        console.log('showitems called');
        const apiUrl = 'http://localhost:5000/bill/api/items';

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
            $scope.arritems = res.data;
            $scope.showModal = true;
            $scope.$digest(); // manually trigger a digest cycle
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
        });
        }
    
        $scope.additems=function(x)
        {   $scope.showorder=true
            let obj={};
        obj.itemname=x.itemname;
        obj.qty=1;
        obj.rate=x.rate;
        obj.amt=x.rate;
    
        $scope.objbill.arritems.push(obj);
        }
    
        $scope.updaterowamt=function(x)
        {
            x.amt=x.qty*x.rate
            $scope.objbill.totalamt=0;
            for(i=0;i<$scope.objbill.arritems.length;i++)
            {
                $scope.objbill.totalamt=$scope.objbill.totalamt+$scope.objbill.arritems[i].amt
            }
        }
    
   
        $scope.removeitem = function(x) {
            var index = $scope.objbill.arritems.indexOf(x);
            if (index !== -1) {
                $scope.objbill.arritems.splice(index, 1);
            }
        }
    
    $scope.savedata=function()
    {

        const apiUrl = 'http://localhost:5000/bill/api/bill';

// Create an object with the data you want to send
const requestData = {

    Billno: $scope.objbill.billno,
    Billdate: $scope.objbill.billdate,
    Customername:$scope.objbill.customer,
    Itemsarray:$scope.objbill.arritems,
    Totalamt:$scope.objbill.totalamt
};

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

    document.getElementById('billno').value="";
    document.getElementById('tdate').value="";
    document.getElementById('cname').value="";

    $scope.objbill.arritems=[];
    $scope.objbill.totalamt=0;

})
.catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error:', error);
});


    }


$scope.getdata=function()
{
   
    const apiUrl = 'http://localhost:5000/bill/api/bill';

// Create an object with the data you want to send
const requestData = {

Billno: $scope.objbill.billno,
// Billdate: $scope.objbill.billdate,
// Customername:$scope.objbill.customer,
// Itemsarray:$scope.objbill.arritems,
// Totalamt:$scope.objbill.totalamt
};

// Make the fetch API call with the appropriate headers and method
fetch(apiUrl, {
method: 'GET',
headers: {
    'Content-Type': 'application/json', // Specify that you're sending JSON data
    // Add any other headers as needed
}
})
.then(response => response.json())
.then(res => {
    
    $scope.mybillno=res.data;



})
.catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error:', error);
});
}

$scope.getmoredetails=function(Billno)
{

    const apiUrl = `http://localhost:5000/bill/api/bill/${Billno}`;

// Create an object with the data you want to send
const requestData = {

Billno: $scope.objbill.billno,
 Billdate: $scope.objbill.billdate,
 Customername:$scope.objbill.customer,
 Itemsarray:$scope.objbill.arritems,
 Totalamt:$scope.objbill.totalamt
};

// Make the fetch API call with the appropriate headers and method
fetch(apiUrl, {
method: 'GET',
headers: {
    'Content-Type': 'application/json', // Specify that you're sending JSON data
    // Add any other headers as needed
}
})
.then(response => response.json())
.then(res => {
    
    $scope.mydata=res.data;
    $scope.showDetails = true;


})
.catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Error:', error);
});
}

});