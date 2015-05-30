'use strict';


Parse.initialize("mQeWb7iTmJSAcUjkSGwPT52D8bCJ6jfeevEk8tm6", "WTlHeCuzEhsVkeOA6CRKul8UGYVHuMLpbd10o0hg");

/**
 * @ngdoc overview
 * @name chroneco
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
    'ngTouch',
    'ui.router',
    'ui.validate'
  ])
  // .config(function ($routeProvider) {
  //   $routeProvider
  //     .when('/', {
  //       templateUrl: 'views/main.html',
  //       controller: 'MainCtrl'
  //     })
  //     .when('/member', {
  //       templateUrl: 'views/member.html',
  //       controller: 'MemberController'
  //     })
  //     .when('/login', {
  //       templateUrl: 'views/login.html',
  //       controller: 'LoginCtrl'
  //     })
  //     .otherwise({
  //       redirectTo: '/'
  //     });
  //
  //   Parse.initialize("mQeWb7iTmJSAcUjkSGwPT52D8bCJ6jfeevEk8tm6", "WTlHeCuzEhsVkeOA6CRKul8UGYVHuMLpbd10o0hg");
  //
  // });

  .config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider,$urlRouterProvider){
      $urlRouterProvider.otherwise("/login");
      $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        requireLogin: true
      })
      .state('member', {
        url: '/member',
        templateUrl: 'views/member.html',
        controller: 'MemberController',
        requireLogin: true
      })
      .state('admin', {
        url: '/admin',
        templateUrl: 'views/admin.html',
        controller: 'AdminController',
        requireLogin: true
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
    }

  ])



  .run(['$rootScope', '$state', 'AuthService', function ($rootScope, $state, AuthService) {


      $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams){
          if (toState.requireLogin) {
              if (!Parse.User.current() || !Parse.User.current().get('emailVerified')) {
                $state.go('login');
                e.preventDefault();
              }
              // if (!AuthService.currentUser.emailVerified) {
              //   $state.go('login', { waitingForEmailVerified: true });
              // }
          }
      });
  }]);
