'use strict';

/**
 * @ngdoc function
 * @name chronecoWebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the chronecoWebApp
 */
angular.module('chroneco')
  .controller('LoginCtrl', function ($scope, $location, $state, AuthService, $stateParams) {


    $scope.currentUser = Parse.User.current();

    $scope.signUp = function(form) {

      var user = new Parse.User();
      user.set("email", form.username);
      user.set("username", form.username);
      user.set("password", form.password);

      user.signUp(null, {
        success: function(user) {
          $scope.$apply(function() {
            $scope.currentUser = user;
            $state.go('login');
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
            AuthService.currentUser = user;
            if (!user.get('emailVerified')) {
              $state.go('login');
              return;
            }

            $state.go('main');
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
      $scope.currentUser = Parse.User.current();
    };

    $scope.isS2softEmail = function(value) {
      if (!value) {
        return false;
      }
      var suffixS2soft = "@s2soft.co.jp";
      return value.indexOf(suffixS2soft, value.length - suffixS2soft.length) !== -1;
    };


  });
