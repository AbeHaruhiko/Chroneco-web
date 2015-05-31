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
   return function(input, total) {
     total = parseInt(total);
     for (var i=0; i<total; i++)
     input.push(i);
     return input;
   };
 });
