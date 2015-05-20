'use strict';

describe('Service: MemberService', function () {

  // load the service's module
  beforeEach(module('chronecoWebApp'));

  // instantiate service
  var MemberService;
  beforeEach(inject(function (_MemberService_) {
    MemberService = _MemberService_;
  }));

  it('should do something', function () {
    expect(!!MemberService).toBe(true);
  });

});
