'use strict';

app.controller('LoginCtrl', function ($scope, $location, notifier, identity, auth) {
    $scope.identity = identity;

    $scope.login = function (user, loginForm) {
        if (loginForm.$valid) {
<<<<<<< .mine
            auth.login(user).then(function (success) {
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
=======
            auth.login(user).then(function (user) {
                if (user) {
                    notifier.success('Successful login!');
                    if (user.roles == 'user') { 
                        $location.path('/home');
                    }
                    
                    if (user.roles == 'recruiter') { 
                        
                    }
                }
                else {
>>>>>>> .r35
                    notifier.error('Username/Password combination is not valid!');
                });
        }
        else {
            notifier.error('Username and password are required fields!');
        }
    };
});