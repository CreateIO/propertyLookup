angular.module('Commutable', [
    'ngRoute',
    'mobile-angular-ui',
    'WeatherApp.controllers.Main',
    'WeatherApp.services.Geolocation',
    'WeatherApp.services.Forecast'
])

    .config(function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'home.html', reloadOnSearch: false});
        $routeProvider.when('/geocoder', {templateUrl: 'home2.html', reloadOnSearch: false});
    });