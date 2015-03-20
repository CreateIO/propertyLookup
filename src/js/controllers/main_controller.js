angular.module('PropLookupRE.controllers.Main', [])

.controller('MainController', function($scope){        
		$scope.currentAddress = "1111 19th St NW, Washington, DC 20036";
        $scope.address = "315 S. Garfield St, Arlington, VA 22204"
  
}) //https://github.com/winkerVSbecks/locator/blob/master/package.json
    .controller('MainCtrl', ['$scope', 'location', function ($scope, location) {
        location.get(angular.noop, angular.noop);
        $scope.isModalVisible = false;

        $scope.toggleModal = function() {
            $scope.isModalVisible = !$scope.isModalVisible;
        };

        $scope.$watch('pickedLocation', $scope.toggleModal);
        $scope.$watch('lookedUpLocation', $scope.toggleModal);
    }]);