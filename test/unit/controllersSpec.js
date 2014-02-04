'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {
  beforeEach(module('memefy.controllers'));
  beforeEach(module('memefy.services'));

  var scope, ctrl;
  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('displayMemes', function() {
    var mockBackend, loader, meme;

    beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, Meme) {
      scope = $rootScope.$new();
      mockBackend = _$httpBackend_;
      meme = Meme;
      meme.setMemes('null');
      ctrl = $controller('displayMemes', { $scope: scope, 'memeFactory' : meme});
    }));

    it('should load no memes', function() {
      expect(scope.memes).toBe(undefined);
    });

    it('should load no meme', function() {
      expect(scope.meme).toBe(undefined);
    });
 });
});
