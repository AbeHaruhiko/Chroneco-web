'use strict';

/**
 * @ngdoc function
 * @name webApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webApp
 */
angular.module('chroneco')
  .controller('MainCtrl', function ($scope, MemberService) {

    $scope.currentMember = null;
    $scope.currentTargetMonth = null;


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

    $scope.setCurrentMember = function(member) {
      $scope.currentMember = member;
    }

    $scope.setCurrentTargetMonth = function(month) {
      $scope.currentTargetMonth = month;
    }

    $scope.getMemberInOutTimes = function() {

        var retrievedInOutTimeRecList = null;
        var retrievedMemberList = null;

        var promises = [];

        var getInOutTimePromise = function () {
          var promise = new Parse.Promise();

          var InOutTime = Parse.Object.extend("InOutTime");
      		var query = new Parse.Query(InOutTime);

          // 対象者絞込
          if ($scope.currentMember) {
            query.equalTo("member", $scope.currentMember);
          }

          // 対象年月絞込
          if ($scope.currentTargetMonth) {
            query.greaterThanOrEqualTo("date", moment($scope.currentTargetMonth + "-01", "YYYY-MM-DD").toDate());
            query.lessThanOrEqualTo("date", moment($scope.currentTargetMonth + "-01").endOf('month').toDate());
          }

      		query.ascending("date");

          query.find().then(function(results) {
            retrievedInOutTimeRecList = results;
            promise.resolve();
          });
          return promise;
        };

        var getMemberPromise = function () {
          var promise = new Parse.Promise();

          var Member = Parse.Object.extend("Member");
      		var query = new Parse.Query(Member);

          query.find().then(function(results) {
            retrievedMemberList = results;
            promise.resolve();
          });
          return promise;
        };

        promises.push(getInOutTimePromise());
        promises.push(getMemberPromise());

        Parse.Promise.when(promises).then(function() {

          angular.forEach(retrievedInOutTimeRecList, function(retrievedInOutTimeRec) {
            angular.forEach(retrievedMemberList, function(retrievedMember) {
              if (retrievedInOutTimeRec.get('member').id === retrievedMember.id) {
                retrievedInOutTimeRec.set('memberName', retrievedMember.get('name'));
              }
            });
          });

          $scope.$apply(function() {
            $scope.inOutTimeList = retrievedInOutTimeRecList;
          });
        });

        // query.find().then(function(results) {
        //
        //   retrievedInOutTimeRecList = results;
        //
        // }).then(function() {
        //   $scope.$apply(function() {
        //     $scope.inOutTimeList = retrievedInOutTimeRecList;
        //   });
        // });

    		// query.find({
    		//   success: function(results) {
        //     for(var index = 0; index < results.length; index++) {
        //       var result = results[index];
        //       result.set('date', formatDate(result.get('date'), 'YYYY/MM/DD'));
        //       result.set('in', formatDate(result.get('in'), 'hh:mm'));
        //       result.set('out', formatDate(result.get('out'), 'hh:mm'));
        //
        //       var member = result.get('member');
        //       member.fetch({
        //         success: function(member) {
        //           result.set("memberName", member.get("name"));
        //         }
        //       });
        //     }
    		//   	$scope.$apply(function() {
    		// 	  	$scope.inOutTimeList = results;
    		//   	});
    		//   },
    		//   error: function(error) {
    		//     alert("Error: " + error.code + " " + error.message);
    		//   }
    		// });
    };

    $scope.getMembers = function() {

    		// var Member = Parse.Object.extend("Member");
    		// var query = new Parse.Query(Member);
    		// query.ascending("dispOrder");
    		// query.find({
    		//   success: function(results) {
    		//   	$scope.$apply(function() {
    		// 	  	$scope.memberList = results;
    		//   	});
    		//   },
    		//   error: function(error) {
    		//     alert("Error: " + error.code + " " + error.message);
    		//   }
    		// });

        // 成功時のCallback関数を渡して、MemberService.getMembersを呼ぶ。
        var memberList = MemberService.getMembers(function(memberList) {
          $scope.$apply(function() {
            $scope.memberList = memberList;
          });
        });


    };

    // 対象年月ドロップダウン用リスト作成
    $scope.targetMonthList = (function() {

      var monthList = [];
      // 即時実行した結果を$scopeへ格納する。
      for (var year = 2015; year <= new Date().getFullYear(); year++) {
        for (var month = 1; month <= 12; month++) {
          monthList.push(year + "-" + ("0" + month).slice(-2));
        }
      }
      return monthList;

    })();



    // Parse.initialize("mQeWb7iTmJSAcUjkSGwPT52D8bCJ6jfeevEk8tm6", "WTlHeCuzEhsVkeOA6CRKul8UGYVHuMLpbd10o0hg");
    // var TestObject = Parse.Object.extend("TestObject");
    // var testObject = new TestObject();
    // testObject.save({foo: "bar"}).then(function(object) {
    //   alert("yay! it worked");
    // });

    $scope.getMembers();
    // $scope.getInOutTimes();


  });
