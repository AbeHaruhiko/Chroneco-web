'use strict';

/**
 * @ngdoc service
 * @name chronecoWebApp.MemberService
 * @description
 * # MemberService
 * Service in the chronecoWebApp.
 */
angular.module('chroneco')
  .service('MemberService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function

    return {
      getMembers: function(successCallback) {

      		var Member = Parse.Object.extend("Member");
      		var query = new Parse.Query(Member);
      		query.ascending("dispOrder");
      		query.find({
      		  success: function(results) {
              successCallback(results);
      		  },
      		  error: function(error) {
      		    console.log("Error: " + error.code + " " + error.message);
              return null;
      		  }
      		});
      }
    };


  });
