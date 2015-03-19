angular.module('PropLookupRE.controllers.Main', [])

.controller('MainController', function($scope){        
	//$scope.currentAddress = "1111 19th St NW, Washington, DC 20036";
	$scope.address2 = "315 S. Garfield St, Arlington, VA 22204";
  	 $scope.issue = function(){
  		var textElement = document.getElementById("householdIncome");
  		textElement.innerHTML = 'no more issue!';  
  		console.log(textElement.innerHTML);		
  	};
});