'use strict';

var app = angular.module('bestJobs', ['ngRoute', 'ngResource']).
    config(['$routeProvider', function ($routeProvider) {
    var routeUserChecks = {
        authenticated: {
            authenticate: function (auth) {
                return auth.isAuthenticated();
            }
        }
    };
    
    $routeProvider
    .when('/login', {
        templateUrl: '/partials/account/login',
        controller: 'LoginCtrl'
    })
    .when('/signup', {
        templateUrl: '/partials/account/signup',
        controller: 'SignUpCtrl'
    })
    .when('/jobs', {
        templateUrl: '/partials/jobSeeker/home',
        controller: 'HomeSeekerCtrl',
        resolve: routeUserChecks.authenticated
    })
    .when('/jobs/:id', {
        templateUrl: '/partials/jobSeeker/jobDetails',
        controller: 'JobDetailsCtrl',
        resolve: routeUserChecks.authenticated
    })
    .otherwise({ redirectTo: '/login' });
}])
.value('toastr', toastr)
.constant('baseServiceUrl', 'http://localhost:3000')

app.run(function ($rootScope, $location, notifier) {
    $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            notifier.error('You are not authorized!');
            $window.history.back();
        }
    })
});