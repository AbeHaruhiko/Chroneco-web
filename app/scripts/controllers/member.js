'use strict';

/**
 * @ngdoc function
 * @name chronecoWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the chronecoWebApp
 */
angular.module('chroneco')
  .controller('MemberController', function ($scope, $log, MemberService) {

    $scope.currentMember = null;
    $scope.currentMemberPhotoUrl = "";

    $scope.getMembers = function() {

        // 成功時のCallback関数を渡して、MemberService.getMembersを呼ぶ。
        var memberList = MemberService.getMembers(function(memberList) {
          $scope.$apply(function() {
            $scope.memberList = memberList;
          });
        });


    };

    $scope.setCurrentMember = function(member) {
      $log.log(member);
      $scope.currentMember = member;

      var profilePhoto = $scope.currentMember.get("photo");
      $scope.currentMemberPhotoUrl = profilePhoto.url();
    };


    // -------------------------------------
    // 初期処理
    // -------------------------------------

    // メンバーリストを取得する。
    $scope.getMembers();

    // ファイルインプットの設定
    var fileSelector = angular.element("#input-id");
    fileSelector.fileinput({"uploadUrl": "dummy", "dropZoneEnabled": false});

    // アップロード直前のイベントでParseに送る。（bootstrap-file-inputによるアップロードは失敗する。）
    fileSelector.on("filepreupload", function(event, data, previewId, index) {

      if (data.files.length > 0) {
        var file = data.files[0];
        var name = "photo.jpg";

        var parseFile = new Parse.File(name, file);
        parseFile.save().then(function() {

          $scope.currentMember.set("photo", parseFile);
          $scope.currentMember.save().then(function() {

            // $scope.$apply(function() {
            //   setPhotoUrl();
            // });
            //
            var profilePhoto = $scope.currentMember.get("photo");

            $scope.$apply(function() {
              $scope.currentMemberPhotoUrl = profilePhoto.url();
            });

            // プレビュー消す
            fileSelector.fileinput("clear");

          }, function(error) {

          });
        }, function(error) {
          console.log(error);
        });
      }
    });


    fileSelector.on('fileuploaderror', function(event, data, previewId, index) {
      $log.error('file upload error. (this is expected results.)')
    });


  });
