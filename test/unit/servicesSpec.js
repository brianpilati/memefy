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
    var memeFactory;
    beforeEach(inject(function(Meme) {
      memeFactory = Meme;
      memeFactory.setMemes('null');
    }));

    it('should have no an undefined getMemes', function() {
      expect(memeFactory.getMemes()).toBe(undefined);
    });

    it('should have no an undefined getMeme()', function() {
      expect(memeFactory.getMeme()).toBe(undefined);
    });

    it('should have no availableMemes', function() {
      expect(memeFactory.isAvailableMemes()).toBe(false);
    });

    it('should have no left navigation', function() {
      expect(memeFactory.showLeftNavigation()).toBe(false);
    });

    it('should have no right navigation', function() {
      expect(memeFactory.showRightNavigation()).toBe(false);
    });
  });

  describe('persistMeme', function() {
    var mockBackend, loader, memeFactory;
    beforeEach(inject(function(_$httpBackend_, persistMeme, Meme) {
      mockBackend = _$httpBackend_;
      loader = persistMeme;
      memeFactory = Meme;
      memeFactory.setMemes('null');
    }));
   
    it('should add one meme', function() {
      var meme = {lineOne: "I usually don't test my code", lineTwo: "but when I do it is in production"};
      var memeId = "dosEquis";
      
      mockBackend.expectPOST('https://memefy.firebaseio.com/memes/' + memeId + '.json').respond(meme);
 
      var promise = loader(memeId, meme);
      promise.then(function(_memeFactory) {
        memeFactory = _memeFactory;
      });
 
      mockBackend.flush();

      expect(memeFactory.getMemes()).toEqualData([meme]);
      expect(memeFactory.getMeme()).toEqualData(meme);
      expect(memeFactory.isAvailableMemes()).toBe(true);
      expect(memeFactory.showLeftNavigation()).toBe(false);
      expect(memeFactory.showRightNavigation()).toBe(false);
    });
  });

  describe('persistMeme', function() {
    var mockBackend, loader, memeFactory, memes, meme, memeId, promise;
    beforeEach(inject(function(_$httpBackend_, persistMeme, Meme) {
      mockBackend = _$httpBackend_;
      loader = persistMeme;
      memes = [
        {lineOne: "1", lineTwo: "2"},
        {lineOne: "3", lineTwo: "4"},
        {lineOne: "5", lineTwo: "6"},
        {lineOne: "7", lineTwo: "8"},
        {lineOne: "9", lineTwo: "10"},
        {lineOne: "11", lineTwo: "12"},
        {lineOne: "13", lineTwo: "14"}
      ];
      memeFactory = Meme;
      memeFactory.setMemes(memes);
      meme = {lineOne: "I usually don't test my code", lineTwo: "but when I do it is in production"};
      memeId = "dosEquis";
      promise = loader(memeId, meme);
      promise.then(function(_memeFactory) {
        memeFactory = _memeFactory;
      });
      mockBackend.expectPOST('https://memefy.firebaseio.com/memes/' + memeId + '.json').respond(meme);
    }));
   
    it('should add one meme', function() {
      var displayMemes = memes.slice(0);
      mockBackend.flush();

      expect(memeFactory.getMemes()).toEqualData(displayMemes);
      expect(memeFactory.getMeme()).toEqualData(meme);
      expect(memeFactory.isAvailableMemes()).toBe(true);
      expect(memeFactory.showLeftNavigation()).toBe(false);
      expect(memeFactory.showRightNavigation()).toBe(true);
    });

    it('should browse right', function() {
      var displayMemes = memes.slice(0);
      mockBackend.flush();

      expect(memeFactory.getMemes()).toEqualData(displayMemes);
      expect(memeFactory.getMeme()).toEqualData(meme);
      expect(memeFactory.isAvailableMemes()).toBe(true);
      expect(memeFactory.showLeftNavigation()).toBe(false);
      expect(memeFactory.showRightNavigation()).toBe(true);

      expect(memeFactory.clickRightNavigation()).toEqualData([meme]);
      expect(memeFactory.showLeftNavigation()).toBe(true);
      expect(memeFactory.showRightNavigation()).toBe(false);
    });

    it('should browse right only once', function() {
      var displayMemes = memes.slice(0);
      mockBackend.flush();

      expect(memeFactory.getMemes()).toEqualData(displayMemes);
      expect(memeFactory.getMeme()).toEqualData(meme);
      expect(memeFactory.isAvailableMemes()).toBe(true);
      expect(memeFactory.showLeftNavigation()).toBe(false);
      expect(memeFactory.showRightNavigation()).toBe(true);

      expect(memeFactory.clickRightNavigation()).toEqualData([meme]);
      expect(memeFactory.showLeftNavigation()).toBe(true);
      expect(memeFactory.showRightNavigation()).toBe(false);

      expect(memeFactory.clickRightNavigation()).toEqualData([meme]);
      expect(memeFactory.showLeftNavigation()).toBe(true);
      expect(memeFactory.showRightNavigation()).toBe(false);
    });

    it('should browse left', function() {
      var displayMemes = memes.slice(0);
      mockBackend.flush();

      expect(memeFactory.getMemes()).toEqualData(displayMemes);
      expect(memeFactory.getMeme()).toEqualData(meme);
      expect(memeFactory.isAvailableMemes()).toBe(true);
      expect(memeFactory.showLeftNavigation()).toBe(false);
      expect(memeFactory.showRightNavigation()).toBe(true);

      expect(memeFactory.clickRightNavigation()).toEqualData([meme]);
      expect(memeFactory.showLeftNavigation()).toBe(true);
      expect(memeFactory.showRightNavigation()).toBe(false);

      expect(memeFactory.clickLeftNavigation()).toEqualData(displayMemes);
      expect(memeFactory.showLeftNavigation()).toBe(false);
      expect(memeFactory.showRightNavigation()).toBe(true);
    });

    it('should browse left only once', function() {
      var displayMemes = memes.slice(0);
      mockBackend.flush();

      expect(memeFactory.getMemes()).toEqualData(displayMemes);
      expect(memeFactory.getMeme()).toEqualData(meme);
      expect(memeFactory.isAvailableMemes()).toBe(true);
      expect(memeFactory.showLeftNavigation()).toBe(false);
      expect(memeFactory.showRightNavigation()).toBe(true);

      expect(memeFactory.clickRightNavigation()).toEqualData([meme]);
      expect(memeFactory.showLeftNavigation()).toBe(true);
      expect(memeFactory.showRightNavigation()).toBe(false);

      expect(memeFactory.clickLeftNavigation()).toEqualData(displayMemes);
      expect(memeFactory.showLeftNavigation()).toBe(false);
      expect(memeFactory.showRightNavigation()).toBe(true);

      expect(memeFactory.clickLeftNavigation()).toEqualData(displayMemes);
      expect(memeFactory.showLeftNavigation()).toBe(false);
      expect(memeFactory.showRightNavigation()).toBe(true);
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
