'use strict'

app.controller('JobDetailsCtrl', function ($scope, $location, $http, $routeParams, notifier) {
    
    var currentId = $routeParams.id;

    $http.get('/api/jobs/'+ currentId).then(function (res) {
        $scope.job = res.data;
    });

    $scope.apply = function () {
        $http.put('/api/jobs/' + currentId).then(function (res) { 
            notifier.success(res.data);
        }, function (err) { 
            notifier.error(err.data);
        });
    }
});