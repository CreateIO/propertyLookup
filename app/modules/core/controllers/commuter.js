'use strict';

/**
 * @ngdoc object
 * @name core.Controllers.CommuterController
 * @description CommuterController
 * @requires ng.$scope
*/
angular
    .module('core')
    .controller('CommuterController', [
        '$scope',
        function($scope) {
            //$scope.currentAddress = "1111 19th St NW, Washington, DC 20036";
            $scope.property = {
              "address":"315 S. Garfield St, Arlington, VA 22204",
              "latitude":0,
              "longitude":0,
              "walkAddress": "",
              "googleAddress":""
            };
            $scope.issue = function () {
              var textElement = document.getElementById("householdIncome");
              textElement.innerHTML = 'no more issue!';
              console.log(textElement.innerHTML);
            };

            function hasStreetNumber(address) {
              var components = address.split(' ');
              var first = components[0];
              var re = /^\d+$/;
              var m;

              if (!re.test(first)) {
                // console.log(first + 'is not an integer');
                return false;
              }
              // console.log(first + 'is an integer');
              return true;
            }

            $scope.walkAddressLookup = function(){
              if ($scope.property.address) {
                console.log("refreshing with address " + $scope.property.address);
                var address = $scope.property.address;

                address = address.replace(',', '');
                //for walkscore
                return address.split(' ').join('-');
              }
            };

            $scope.refresh = function(){
              if ($scope.property.address) {
                console.log("refreshing with address "+ $scope.property.address);
                //for walkscore
                $scope.property.walkAddress = $scope.walkAddressLookup();

                console.log("walk address is "+ $scope.property.walkAddress);

                if (hasStreetNumber($scope.property.address)) {
                  $scope.property.googleAddress = $scope.property.address;
                } else {
                  //try lat long, because this address isn't very specific
                  $scope.property.googleAddress = '' + $scope.property.latitude + ', ' + $scope.property.longitude;
                }
                // console.log($scope.googleAddress);
              }
            };
            var timeout = null;

            //$scope.debounceRefresh = function(newVal, oldVal) {
            //    console.log("dbouncing");
            //    if (newVal != oldVal) {
            //        if (timeout) {
            //            $timeout.cancel(timeout)
            //        }
            //        timeout = $timeout( $rootScope.$apply(refresh), 1000);  // 1000 = 1 second
            //    }
            //};
            //$scope.$watch('property.address', $scope.debounceRefresh);
            $scope.refresh();

        }
]);
