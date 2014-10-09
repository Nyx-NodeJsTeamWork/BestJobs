'use strict'

app.controller('JobDetailsCtrl', function ($scope, $location, $http, $routeParams) {
    $http.get('/api/jobs/'+ $routeParams.id).then(function (res) {
        $scope.job = res.data;
    });
});