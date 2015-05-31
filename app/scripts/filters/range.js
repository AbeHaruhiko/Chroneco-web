'use strict';

/**
 * @ngdoc filter
 * @name chroneco.filter:range
 * @function
 * @description
 * # range
 * Filter in the chroneco.
 */
 angular.module('chroneco')
 .filter('range', function () {
   return function (input, total) {
     total = parseInt(total);
     for (var i = 0; i < total; i++) {
       input.push(i);
     }
     return input;
   };
 });

 angular.module('chroneco')
 angular.module('chroneco')
 .filter('rangeFromOne', function () {
   return function (input, total) {
     total = parseInt(total);
     for (var i = 1; i <= total; i++) {
       input.push(i);
     }
     return input;
   };
 });

 angular.module('chroneco')
 .filter('rangeFromOneWithBlank', function () {
   return function (input, total) {

     // 先頭に空白をセットする。
     input.push("　");
     total = parseInt(total);
     for (var i = 1; i <= total; i++) {
       input.push(i);
     }
     return input;
   };
 });
