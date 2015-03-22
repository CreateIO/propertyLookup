angular.module('PropLookupRE.controllers.Main', [])


    .controller('MainController', function ($scope) {
        $scope.currentAddress = "1111 19th St NW, Washington, DC 20036";
        $scope.address = "315 S. Garfield St, Arlington, VA 22204";
        $scope.latitude = 0;
        $scope.longitude = 0;
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

        $scope.refresh = function(){
            if ($scope.address) {
                var address = $scope.address.replace(',', '');
                
                //for walkscore
                $scope.walkAddress = address.split(' ').join('-');
                //for zillow rents
                $scope.zillowAddress = address.split(' ').join('+');
                //for zillow rents

                if (hasStreetNumber(address)) {
                    $scope.googleAddress = address;
                } else {
                    //try lat long, because this address isn't very specific
                    $scope.googleAddress = '' + $scope.latitude + ', ' + $scope.longitude;
                }
                // console.log($scope.googleAddress);
            }
        };
        var timeout = null;

        var debounceRefresh = function(newVal, oldVal) {
            if (newVal != oldVal) {
                if (timeout) {
                    $timeout.cancel(timeout)
                }
                timeout = $timeout(refresh, 1000);  // 1000 = 1 second
            }
        };
        $scope.$watch('address', debounceRefresh);
        $scope.refresh();
    }) //https://github.com/winkerVSbecks/locator/blob/master/package.json
//     .controller('MainController', ['$scope', 'location', function ($scope, location) {
//         location.get(angular.noop, angular.noop);
//         $scope.isModalVisible = false;

//         $scope.toggleModal = function () {
//             $scope.isModalVisible = !$scope.isModalVisible;
//         };

//         $scope.$watch('pickedLocation', $scope.toggleModal);
//         $scope.$watch('lookedUpLocation', $scope.toggleModal);

// //    TweetMax.to('.navbar-brand-center', 2, {left: 500});

    // }])
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
