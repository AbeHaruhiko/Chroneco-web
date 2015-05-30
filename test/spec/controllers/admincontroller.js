'use strict';

describe('Controller: AdmincontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('chronecoWebApp'));

  var AdmincontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdmincontrollerCtrl = $controller('AdmincontrollerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
