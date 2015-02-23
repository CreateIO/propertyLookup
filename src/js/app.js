angular.module('PropLookupRE', [
  'ngRoute',
  'mobile-angular-ui',
  'PropLookupRE.controllers.Main'
])

.config(function($routeProvider) {
  $routeProvider.when('/', {templateUrl:'home.html',  reloadOnSearch: false});
});