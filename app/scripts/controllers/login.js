'use strict';

/**
 * @ngdoc function
 * @name chronecoWebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the chronecoWebApp
 */
angular.module('chroneco')
  .controller('LoginCtrl', function ($scope, $location) {


    $scope.currentUser = Parse.User.current();

    $scope.signUp = function(form) {
      var user = new Parse.User();
      user.set("email", form.email);
      user.set("username", form.username);
      user.set("password", form.password);

      user.signUp(null, {
        success: function(user) {
          $scope.$apply(function() {
            $scope.currentUser = user;
          });
        },
        error: function(user, error) {
          alert("Unable to sign up:  " + error.code + " " + error.message);
        }
      });
    };

    $scope.logIn = function(form) {
      Parse.User.logIn(form.username, form.password, {
        success: function(user) {
          $scope.$apply(function() {
            $scope.currentUser = user;
            $location.path('/');
          });
        },
        error: function(user, error) {
          console.log("Unable to login:  " + error.code + " " + error.message);
          $location.path('/login');
        }
      });
    };

    $scope.logOut = function(form) {
      Parse.User.logOut();
      $scope.currentUser = null;
    };


  });
