'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('memefy.services'));

  var $scope, ctrl;
  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('Meme', function() {
    var memeService;
    beforeEach(inject(function(Meme) {
      memeService = Meme;
      memeService.setMemes('null');
    }));

    it('should have no an undefined getMemes', function() {
      expect(memeService.getMemes()).toBe(undefined);
    });

    it('should have no an undefined getMeme(0)', function() {
      expect(memeService.getMeme(0)).toBe(undefined);
    });

    it('should have no availableMemes', function() {
      expect(memeService.isAvailableMemes()).toBe(false);
    });

    it('should have no left navigation', function() {
      expect(memeService.showLeftNavigation()).toBe(false);
    });

    it('should have no right navigation', function() {
      expect(memeService.showRightNavigation()).toBe(false);
    });
  });
 
  describe('GetAllMemes', function() {
    var mockBackend, loader, route;
    beforeEach(inject(function(_$httpBackend_, GetAllMemes, $route) {
      mockBackend = _$httpBackend_;
      loader = GetAllMemes;
      route = $route;
    }));
   
    it('should load no memes', function() {
      
      mockBackend.expectGET('https://memefy.firebaseio.com/memes/dosEquis.json').respond('null');
      route.current = {params : {memeId: 'dosEquis'}};
 
      var memeFactory;
      var promise = loader();
      promise.then(function(_memeFactory) {
        memeFactory = _memeFactory;
      });
 
      expect(memeFactory).toBeUndefined();
 
      mockBackend.flush();
 
      expect(memeFactory.getMemes()).toEqualData(undefined);
   });
 });
});
