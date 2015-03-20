angular.module('PropLookupRE.controllers.Main', [])

.controller('MainController', function($scope){        
	//$scope.currentAddress = "1111 19th St NW, Washington, DC 20036";
	$scope.address2 = "315 S. Garfield St, Arlington, VA 22204";
  	 $scope.issue = function(){
  		var textElement = document.getElementById("householdIncome");
  		textElement.innerHTML = 'no more issue!';  
  		console.log(textElement.innerHTML);		
  	};
}) //https://github.com/winkerVSbecks/locator/blob/master/package.json
    .controller('MainCtrl', ['$scope', 'location', function ($scope, location) {
        location.get(angular.noop, angular.noop);
        $scope.isModalVisible = false;

        $scope.toggleModal = function() {
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
        words.forEach(function(word) {
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

.directive('smoothButton', function(){
    var linker = function (scope, element, attrs) {
        var tl = new TimelineLite();
        tl.add(TweenLite.to(element.find('.red'), 0.4, {scaleX:1.8, scaleY:1.8, ease: Power2.easeOut}));
        tl.add(TweenLite.to(element.find('.orange'), 0.4, {scaleX:1.6, scaleY:1.6, ease: Power2.easeOut}), '-=0.2');
        tl.add(TweenLite.to(element.find('.yellow'), 0.4, {scaleX:1.4, scaleY:1.4, ease: Power2.easeOut}), '-=0.2');
        tl.stop();

        scope.play = function() {
            tl.play();
        };

        scope.reverse = function() {
            tl.reverse();
        };
    };

    return {
        scope: true,
        link: linker,
//        templateUrl: 'smooth-button.tmpl.html'
    }
});
