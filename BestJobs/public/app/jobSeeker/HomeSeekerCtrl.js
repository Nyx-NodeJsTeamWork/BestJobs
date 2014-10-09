'use strict'

app.controller('HomeSeekerCtrl', function ($scope, $location, $http, baseServiceUrl, notifier, identity) {
    $scope.jobOffers = [];

    $http.get('/api/jobs').then(function (res) {
        $scope.jobOffers = res.data;
    });
});