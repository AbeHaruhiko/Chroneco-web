'use strict';

/**
 * @ngdoc service
 * @name chronecoWebApp.AuthService
 * @description
 * # AuthService
 * Service in the chronecoWebApp.
 */
angular.module('chroneco')
  .service('AuthService', function ($state) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    this.currentUser = Parse.User.current();

    // $scope.currentUser = Parse.User.current();
    //
    // $scope.signUp = function(form) {
    //   var user = new Parse.User();
    //   user.set("email", form.email);
    //   user.set("username", form.username);
    //   user.set("password", form.password);
    //
    //   user.signUp(null, {
    //     success: function(user) {
    //       $scope.currentUser = user;
    //       $scope.$apply(); // Notify AngularJS to sync currentUser
    //     },
    //     error: function(user, error) {
    //       alert("Unable to sign up:  " + error.code + " " + error.message);
    //     }
    //   });
    // };
    //
    // $scope.logIn = function(form) {
    //   var user = new Parse.User();
    //   user.set("username", form.username);
    //   user.set("password", form.password);
    //
    //   user.logIn(null, {
    //     success: function(user) {
    //       $scope.currentUser = user;
    //       $scope.$apply(); // Notify AngularJS to sync currentUser
    //     },
    //     error: function(user, error) {
    //       alert("Unable to login:  " + error.code + " " + error.message);
    //     }
    //   });
    // };
    //

    this.logOut = function() {
      Parse.User.logOut();
      this.currentUser = null;
      $state.go("login");
    };


  });
