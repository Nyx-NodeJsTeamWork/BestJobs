'use strict';

app.controller('SignUpCtrl', ['$scope', '$location', 'auth', 'notifier',
    function($scope, $location, auth, notifier) {
    $scope.signup = function(user) {
        auth.signup(user).then(function() {
            notifier.success('Registration successful!');
            $location.path('/');
        })
    }

    $scope.isDriverChecked = false;

    $scope.changeIsDriverState = function(){
        $scope.isDriverChecked = !$scope.isDriverChecked;
    }
}]);