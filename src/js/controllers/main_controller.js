angular.module('Commutable')
    .factory('deviceReady', function () {
        return function (done) {
            if (typeof window.cordova === 'object') {
                document.addEventListener('deviceready', function () {
                    done();
                }, false);
            } else {
                done();
            }
        };
    })
    .factory('getCurrentPosition', function (deviceReady, $document, $window, $rootScope) {
        return function (done) {
            deviceReady(function () {
                navigator.geolocation.getCurrentPosition(function (position) {
                    $rootScope.$apply(function () {
                        done(position);
                    });
                }, function (error) {
                    $rootScope.$apply(function () {
                        throw new Error('Unable to retrieve position');
                    });
                });
            });
        };
    }).factory('getWeather', function($http){
        return function(lat, lng, done) {
            $http({method: 'GET', url: 'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng})
                .success(function(data, status, headers, config) {
                    done(data.name, data.weather[0].description);
                })
                .error(function(data, status, headers, config) {
                    throw new Error('Unable to get weather');
                });
        };
    })
    .controller('MainController', ['$scope', '$document', '$window', '$rootScope', 'deviceReady', 'getCurrentPosition', function ($scope, $document, $window, $rootScope, deviceReady, getCurrentPosition) {
        //$scope.currentAddress = "1111 19th St NW, Washington, DC 20036";
        $scope.model = {
            "address": "555 Pennsylvania Ave NW, Washington, DC 20001",
            "latitude": 0,
            "longitude": 0,
            "walkAddress": "",
            "googleAddress": "",
            "currentPosition": "",
            "location":"",
            "weather":"",
            "markers":""
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
                console.log("refreshing with address " + $scope.model.address);
                var address = $scope.model.address;

                address = address.replace(',', '');
                //for walkscore
                return address.split(' ').join('-');
            }
        };

        $scope.loadAddresses = function () {
            // console.log($scope.googleAddress);
             getCurrentPosition(function (position) {
                 console.log("Position is ");
                 console.log(position);
                 $scope.model.currentPosition = position;
                 $scope.model.latitude = position.coords.latitude;
                 $scope.model.longitude = position.coords.longitude;
                 getWeather(
                     position.coords.latitude,
                     position.coords.longitude,
                     function(location, weather){
                         $scope.model.location = location;
                         $scope.model.weather = weather;
                     });
                 $scope.model.markers = [{
                     color: 'blue',
                     label: 'S',
                     coords: [position.coords.latitude, position.coords.longitude,]
                 }];
             });

            if ($scope.model.address) {
                console.log("refreshing with address " + $scope.model.address);
                //for walkscore
                $scope.model.walkAddress = $scope.walkAddressLookup();

                console.log("walk address is " + $scope.model.walkAddress);

                if (hasStreetNumber($scope.model.address)) {
                    $scope.model.googleAddress = $scope.model.address;
                } else {
                    //try lat long, because this address isn't very specific
                    $scope.model.googleAddress = '' + $scope.model.currentPosition.coords.latitude + ', ' + $scope.model.currentPosition.coords.longitude;
                }

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
        //$scope.$watch('model.address', $scope.debounceRefresh);
        $scope.loadAddresses();
    }]) //https://github.com/winkerVSbecks/locator/blob/master/package.json
    .controller('locationCtrl', ['$scope', 'location', function ($scope, location) {
        location.get(angular.noop, angular.noop);
        $scope.isModalVisible = false;

        $scope.toggleModal = function () {
            $scope.isModalVisible = !$scope.isModalVisible;
        };

        $scope.$watch('pickedLocation', $scope.toggleModal);
        $scope.$watch('lookedUpLocation', $scope.toggleModal);

//    TweetMax.to('.navbar-brand-center', 2, {left: 500});

    }])
    .filter('capitalize', function () {
        return function (input, format) {
            if (!input) {
                return input;
            }
            format = format || 'all';
            if (format === 'first') {
                // Capitalize the first letter of a sentence
                return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
            } else {
                var words = input.split(' ');
                var result = [];
                words.forEach(function (word) {
                    if (word.length === 2 && format === 'nottwo' && word.toLowerCase() !== 'of' && word.toLowerCase() !== 'st') {
                        // Uppercase team abbreviations like FC, CD, SD except of and st
                        result.push(word.toUpperCase());
                    } else {
                        result.push(word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
                    }
                });
                return result.join(' ');
            }
        };
    })

    .directive('smoothButton', function () {
        var linker = function (scope, element, attrs) {
            var tl = new TimelineLite();
            tl.add(TweenLite.to(element.find('.red'), 0.4, {scaleX: 1.8, scaleY: 1.8, ease: Power2.easeOut}));
            tl.add(TweenLite.to(element.find('.orange'), 0.4, {
                scaleX: 1.6,
                scaleY: 1.6,
                ease: Power2.easeOut
            }), '-=0.2');
            tl.add(TweenLite.to(element.find('.yellow'), 0.4, {
                scaleX: 1.4,
                scaleY: 1.4,
                ease: Power2.easeOut
            }), '-=0.2');
            tl.stop();

            scope.play = function () {
                tl.play();
            };

            scope.reverse = function () {
                tl.reverse();
            };
        };

        return {
            scope: true,
            link: linker
//        templateUrl: 'smooth-button.tmpl.html'
        }
    });