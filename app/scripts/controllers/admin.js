'use strict';

/**
 * @ngdoc function
 * @name chroneco.controller:AdmincontrollerCtrl
 * @description
 * # AdminController
 * Controller of the chroneco
 */
angular.module('chroneco')
  .controller('AdminController', function ($scope) {

    // 2015/05/30 使ってないけど一応残しておく
    $scope.setAllInOutTimeRecPublic = function() {

      var InOutTime = Parse.Object.extend("InOutTime");
      var query = new Parse.Query(InOutTime);
      query.find({
        success: function(results) {

          var acl = new Parse.ACL();
          acl.setPublicReadAccess(true);
          acl.setRoleWriteAccess("admin", true);

          angular.forEach(results, function(inOutTime, index){
            inOutTime.setACL(acl);
            inOutTime.save();
          });
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });
    };

  });
