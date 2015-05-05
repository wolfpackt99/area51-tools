angular.module('area51Tools', [
    'ngRoute',
    'mobile-angular-ui',
    'area51Tools.controllers.main',
    'area51Tools.controllers.fng',
    'area51Tools.controllers.calendar',
    'area51Tools.services.mailchimp'
])

.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home.html',
        reloadOnSearch: false
    });
    $routeProvider.when('/fng', {
        templateUrl: 'fng.html',
        reloadOnSearch: false
    });
    $routeProvider.when('/calendar', {
        templateUrl: 'calendar.html',
        reloadOnSearch: false
    });
});