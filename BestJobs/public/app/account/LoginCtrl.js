'use strict';

app.controller('LoginCtrl', function ($scope, $location, notifier, identity, auth) {
    if (identity.isAuthenticated()) {
        notifier.error('You\'re already authenticated!');
        
        if (identity.currentUser.roles == 'user') { 
            $location.path('/home');
        }

        return;
    }

    $scope.identity = identity;
    
    $scope.login = function (user, loginForm) {
        if (loginForm.$valid) {
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