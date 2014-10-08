'use strict';

var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ngCookies']).
    config(['$routeProvider', function($routeProvider) {
        var routeUserChecks = {
            authenticated: {
                authenticate: function(auth) {
                    return auth.isAuthenticated();
                }
            }
        };

        $routeProvider
            .when('/', {
                templateUrl: '/partials/account/home'
            })
            .otherwise({ redirectTo: '/' });
    }])
    .value('toastr', toastr)
    .constant('baseServiceUrl', 'http://localhost:3000');

app.run(function($rootScope, $location, notifier) {
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            notifier.error(rejection);
            //$location.path('/unauthorized');
        }
    })
});