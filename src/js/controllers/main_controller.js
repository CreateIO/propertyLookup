angular.module('Commutable')

    .factory('deviceReady', function(){
        return function(done) {
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
    })
    .controller('MainController',['$scope','$document', '$window', '$rootScope', 'deviceReady', 'getCurrentPosition', function ($scope, $document, $window, $rootScope, deviceReady, getCurrentPosition) {
        //$scope.currentAddress = "1111 19th St NW, Washington, DC 20036";
        $scope.property = {
            "address":"315 S. Garfield St, Arlington, VA 22204", 
            "latitude":0, 
            "longitude":0,
            "walkAddress": "",
            "googleAddress":"",
            "currentPosition":""
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
            
        $scope.loadAddresses = function(){
            // console.log($scope.googleAddress);
            $scope.property.currentPosition = getCurrentPosition(function(position){
                console.log("Position is ");
                console.log(position);

            });
            
            if ($scope.property.address) {
                console.log("refreshing with address "+ $scope.property.address);
                //for walkscore
                $scope.property.walkAddress = $scope.walkAddressLookup();

                console.log("walk address is "+ $scope.property.walkAddress);
                
                if (hasStreetNumber($scope.property.address)) {
                    $scope.property.googleAddress = $scope.property.address;
                } else {
                    //try lat long, because this address isn't very specific
                    $scope.property.googleAddress = '' + $scope.property.currentPosition.coords.latitude + ', ' + $scope.property.currentPosition.coords.longitude;
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
        //$scope.$watch('property.address', $scope.debounceRefresh);
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