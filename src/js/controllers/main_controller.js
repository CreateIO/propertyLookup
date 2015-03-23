angular.module('Commutable')
    .controller('MainController', ['$scope', '$document', '$window', '$rootScope', 'deviceReady', 'getCurrentPosition', 'getWeather', function ($scope, $document, $window, $rootScope, deviceReady, getCurrentPosition, getWeather) {
        //$scope.currentAddress = "1111 19th St NW, Washington, DC 20036";
        $scope.model = {
            "address": "555 Pennsylvania Ave NW, Washington, DC 20001",
            "latitude": 0,
            "longitude": 0,
            "walkAddress": "555-Pennsylvania-Ave-NW-Washington-DC-20001",
            "googleAddress": "",
            "currentPosition": "",
            "location": "",
            "weather": ""
        };

        $scope.issue = function () {
            var textElement = document.getElementById("householdIncome");
            textElement.innerHTML = 'I am a changed div!';
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

        $scope.walkAddressLookup = function () {
            if ($scope.model.address) {
//                console.log("refreshing with address " + $scope.model.address);
                var address = $scope.model.address;

                address = address.replace(',', '');
                //for walkscore
                return address.split(' ').join('-');
            }
        };

        $scope.loadAddresses = function () {
            // console.log($scope.googleAddress);
            getCurrentPosition(function (position) {
                $scope.model.currentPosition = position;
                $scope.model.latitude = position.coords.latitude;
                $scope.model.longitude = position.coords.longitude;
                getWeather(
                    position.coords.latitude,
                    position.coords.longitude,
                    function (location, weather) {
                        $scope.model.location = location;
                        $scope.model.weather = weather;
                    });
            });

            if ($scope.model.address) {
                //for walkscore
                $scope.model.walkAddress = $scope.walkAddressLookup();

                if (hasStreetNumber($scope.model.address)) {
                    $scope.model.googleAddress = $scope.model.address;
                } else {
                    //try lat long, because this address isn't very specific
                    $scope.model.googleAddress = '' + $scope.model.currentPosition.coords.latitude + ', ' + $scope.model.currentPosition.coords.longitude;
                }

            }
        };

        $scope.loadAddresses();
    }]);