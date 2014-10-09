'use strict';

app.controller('RegisterCtrl', function ($scope, $location, notifier, identity, auth) {
    $scope.identity = identity;

    $scope.registerHr = function (hr, registerHrForm) {
        if (registerHrForm.$valid) {
            auth.registerHr(hr, registerHrForm).then(function (success) {
                if (success) {
                    notifier.success('Successful login!');
                    $location.path('/');
                }
                else {
                    notifier.error('Username/Password combination is not valid!');
                }
            },
            function (reason) {
                console.log(reason);
                notifier.error('Username/Password combination is not valid!');
            });
        }
        else {
            notifier.error('Username and password are required fields!');
        }
    };

    $scope.registerUser = function (user, registerUserForm) {
        if (registerUserForm.$valid) {
            auth.registerUser(user, registerUserForm).then(function (success) {
                    if (success) {
                        notifier.success('Successful login!');
                        $location.path('/');
                    }
                    else {
                        notifier.error('Username/Password combination is not valid!');
                    }
                },
                function (reason) {
                    console.log(reason);
                    notifier.error('Username/Password combination is not valid!');
                });
        }
        else {
            notifier.error('Username and password are required fields!');
        }
    };

});
