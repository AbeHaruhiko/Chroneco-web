'use strict';

/**
 * @ngdoc overview
 * @name chronecoWebApp
 * @description
 * # chronecoWebApp
 *
 * Main module of the application.
 */
angular
  .module('chroneco', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    Parse.initialize("mQeWb7iTmJSAcUjkSGwPT52D8bCJ6jfeevEk8tm6", "WTlHeCuzEhsVkeOA6CRKul8UGYVHuMLpbd10o0hg");

  });
