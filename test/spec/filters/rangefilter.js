'use strict';

describe('Filter: rangeFilter', function () {

  // load the filter's module
  beforeEach(module('chronecoWebApp'));

  // initialize a new instance of the filter before each test
  var rangeFilter;
  beforeEach(inject(function ($filter) {
    rangeFilter = $filter('rangeFilter');
  }));

  it('should return the input prefixed with "rangeFilter filter:"', function () {
    var text = 'angularjs';
    expect(rangeFilter(text)).toBe('rangeFilter filter: ' + text);
  });

});
