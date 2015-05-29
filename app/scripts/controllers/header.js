'use strict';

/**
 * @ngdoc function
 * @name chroneco.controller:HeaderController
 * @description
 * # HeaderController
 * Controller of the chronecoWebApp
 */
angular.module('chroneco')
  .controller('HeaderController', function ($scope, $location, AuthService) {

    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };

    $scope.logOut = function() {
      AuthService.logOut();
    }
  });
