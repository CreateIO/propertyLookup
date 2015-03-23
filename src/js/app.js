angular.module('Commutable', [
    'ngRoute',
    'mobile-angular-ui'
]).config(function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'home.html', reloadOnSearch: false});
        $routeProvider.when('/geocoder', {templateUrl: 'example.html', reloadOnSearch: false});
    });