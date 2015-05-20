'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('chroneco')
  .controller('MainCtrl', function ($scope) {

    $scope.getInOutTimes = function() {

    		var InOutTime = Parse.Object.extend("InOutTime");
    		var query = new Parse.Query(InOutTime);
    		query.descending("createdAt");
    		query.find({
    		  success: function(results) {
    		  	$scope.$apply(function() {
    			  	$scope.inOutTimeList = results;
    		  	});
    		  },
    		  error: function(error) {
    		    alert("Error: " + error.code + " " + error.message);
    		  }
    		});
    };

    $scope.getMemberInOutTimes = function(member) {

    		var InOutTime = Parse.Object.extend("InOutTime");
    		var query = new Parse.Query(InOutTime);
        query.equalTo("member", member);
    		query.descending("createdAt");
    		query.find({
    		  success: function(results) {
            for(var index = 0; index < results.length; index++) {
              var result = results[index];
              result.set('date', formatDate(result.get('date'), 'YYYY/MM/DD'));
              result.set('in', formatDate(result.get('in'), 'hh:mm'));
              result.set('out', formatDate(result.get('out'), 'hh:mm'));
            }
    		  	$scope.$apply(function() {
    			  	$scope.inOutTimeList = results;
    		  	});
    		  },
    		  error: function(error) {
    		    alert("Error: " + error.code + " " + error.message);
    		  }
    		});
    };

    $scope.getMembers = function() {

    		var Member = Parse.Object.extend("Member");
    		var query = new Parse.Query(Member);
    		query.ascending("dispOrder");
    		query.find({
    		  success: function(results) {
    		  	$scope.$apply(function() {
    			  	$scope.memberList = results;
    		  	});
    		  },
    		  error: function(error) {
    		    alert("Error: " + error.code + " " + error.message);
    		  }
    		});
    };

    Parse.initialize("mQeWb7iTmJSAcUjkSGwPT52D8bCJ6jfeevEk8tm6", "WTlHeCuzEhsVkeOA6CRKul8UGYVHuMLpbd10o0hg");
    // var TestObject = Parse.Object.extend("TestObject");
    // var testObject = new TestObject();
    // testObject.save({foo: "bar"}).then(function(object) {
    //   alert("yay! it worked");
    // });

    $scope.getMembers();
    // $scope.getInOutTimes();


  });
