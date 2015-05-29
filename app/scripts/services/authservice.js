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

    // this.currentUser = Parse.User.current();

    this.signUp = function(form, callbacks) {
      var user = new Parse.User();
      user.set("email", form.username);
      user.set("username", form.username);
      user.set("password", form.password);

      user.signUp(null, callbacks);
    };

    this.logIn = function(form, callbacks) {
      Parse.User.logIn(form.username, form.password, callbacks);
    };


    this.logOut = function() {
      Parse.User.logOut();
      this.currentUser = null;
      $state.go("login");
    };


  });
