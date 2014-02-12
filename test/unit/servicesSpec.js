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

    it('should have no memeImageId', function() {
      expect(memeFactory.getImageId()).toBe(undefined);
    });
  });

  describe('GetAllMemes', function() {
    var mockBackend, loader;
    beforeEach(inject(function(_$httpBackend_, GetAllMemes) {
      mockBackend = _$httpBackend_;
      loader = GetAllMemes;
    }));
   
    it('should load no memes', function() {
      mockBackend.expectGET('https://memefy.firebaseio.com/memes.json').respond('null');
 
      var memes;
      var promise = loader();
      promise.then(function(_memes) {
        memes = _memes;
      });
 
      expect(memes).toBeUndefined();
 
      mockBackend.flush();
 
      expect(memes).toBe(undefined);
    });

    it('should load memes', function() {
      var returnMemes = {"DosEquis":{"-JFSOZT0vfPTc381tAsU":{"user":"9101","lineTwo":"6","lineOne":"5"},"-JFSOMEkprqcmHxOd2zd":{"user":"1234","lineTwo":"2","lineOne":"1"}},"BurtReynolds":{"-JFSOnHTnEWKGTbxU4Yv":{"user":"5678","lineTwo":"4","lineOne":"3"}}};
      mockBackend.expectGET('https://memefy.firebaseio.com/memes.json').respond(returnMemes);
 
      var memes;
      var promise = loader();
      promise.then(function(_memes) {
        memes = _memes;
      });
 
      expect(memes).toBeUndefined();
 
      mockBackend.flush();
 
      expect(memes).toEqualData(globalMemeTypes.slice(0,2));
   });
  });

  describe('PersistMeme', function() {
    var mockBackend, loader, memeFactory;
    beforeEach(inject(function(_$httpBackend_, PersistMeme, Meme) {
      mockBackend = _$httpBackend_;
      loader = PersistMeme;
      memeFactory = Meme;
      memeFactory.setMemes('null');
    }));
   
    it('should add one meme', function() {
      var meme = {lineOne: "I usually don't test my code", lineTwo: "but when I do it is in production"};
      var memeId = "DosEquis";
      
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

  describe('PersistMeme', function() {
    var mockBackend, loader, memeFactory, memes, meme, memeId, promise, expectedMemes;
    beforeEach(inject(function(_$httpBackend_, PersistMeme, Meme) {
      mockBackend = _$httpBackend_;
      loader = PersistMeme;
      memes = {
        "DosEquis": {
          "-adsfasdfasd1" : {lineOne: "1", lineTwo: "2"},
          "-adsfasdfasd2" : {lineOne: "3", lineTwo: "4"},
          "-adsfasdfasd3" : {lineOne: "5", lineTwo: "6"},
          "-adsfasdfasd4" : {lineOne: "7", lineTwo: "8"},
          "-adsfasdfasd5" : {lineOne: "9", lineTwo: "10"},
          "-adsfasdfasd6" : {lineOne: "11", lineTwo: "12"},
          "-adsfasdfasd7" : {lineOne: "13", lineTwo: "14"}
        }
      };

      expectedMemes = [{lineOne: '1', lineTwo: '2'}, {lineOne: '3', lineTwo: '4'}, {lineOne: '5', lineTwo: '6'}, {lineOne: '7', lineTwo: '8'}, {lineOne: '9', lineTwo: '10'}, {lineOne: '11', lineTwo: '12'}, {lineOne: '13', lineTwo: '14'}];

      memeFactory = Meme;
      memeFactory.setMemes(memes);
      meme = {lineOne: "I usually don't test my code", lineTwo: "but when I do it is in production"};
      memeId = "DosEquis";
      promise = loader(memeId, meme);
      promise.then(function(_memeFactory) {
        memeFactory = _memeFactory;
      });
      mockBackend.expectPOST('https://memefy.firebaseio.com/memes/' + memeId + '.json').respond(meme);
    }));
   
    it('should add one meme', function() {
      var displayMemes = expectedMemes.slice(0);
      mockBackend.flush();

      expect(memeFactory.getMemes()).toEqualData(displayMemes);
      expect(memeFactory.getMeme()).toEqualData(meme);
      expect(memeFactory.isAvailableMemes()).toBe(true);
      expect(memeFactory.showLeftNavigation()).toBe(false);
      expect(memeFactory.showRightNavigation()).toBe(true);
    });

    it('should browse right', function() {
      var displayMemes = expectedMemes.slice(0);
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
      var displayMemes = expectedMemes.slice(0);
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
      var displayMemes = expectedMemes.slice(0);
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
      var displayMemes = expectedMemes.slice(0);
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
 
  describe('GetAllMemesByType', function() {
    var mockBackend, loader, route;
    beforeEach(inject(function(_$httpBackend_, GetAllMemesByType, $route) {
      mockBackend = _$httpBackend_;
      loader = GetAllMemesByType;
      route = $route;
    }));
   
    it('should load no memes', function() {
      
      mockBackend.expectGET('https://memefy.firebaseio.com/memes/DosEquis.json').respond('null');
      route.current = {params : {memeId: 'DosEquis'}};
 
      var memeFactory;
      var promise = loader();
      promise.then(function(_memeFactory) {
        memeFactory = _memeFactory;
      });
 
      expect(memeFactory).toBeUndefined();
 
      mockBackend.flush();
 
      expect(memeFactory.getMemes()).toEqualData(undefined);
      expect(memeFactory.getMeme()).toEqualData(undefined);
      expect(memeFactory.getImageId()).toEqualData(undefined);
   });
 });

  describe('GetAllMemesByType', function() {
    var mockBackend, loader, route, memeFactory;
    beforeEach(inject(function(_$httpBackend_, GetAllMemesByType, $route, Meme) {
      mockBackend = _$httpBackend_;
      loader = GetAllMemesByType;
      route = $route;
      memeFactory = Meme;
    }));
   
    it('should load memes', function() {
      var returnMemes = {"DosEquis":{"-JFSOZT0vfPTc381tAsU":{"user":"9101","lineTwo":"6","lineOne":"5"},"-JFSOMEkprqcmHxOd2zd":{"user":"1234","lineTwo":"2","lineOne":"1"}}};
      var expectedMemes = [ { user : '9101', lineTwo : '6', lineOne : '5' }, { user : '1234', lineTwo : '2', lineOne : '1' } ];
      
      mockBackend.expectGET('https://memefy.firebaseio.com/memes/DosEquis.json').respond(returnMemes);
      route.current = {params : {memeId: 'DosEquis'}};
 
      var promise = loader();
      promise.then(function(_memeFactory) {
        memeFactory = _memeFactory;
      });
 
      mockBackend.flush();

 
      expect(memeFactory.getMemes()).toEqualData(expectedMemes);
    });
  });

  describe('ParseMemeTypes', function() {
    var loader;
    beforeEach(inject(function(ParseMemeTypes) {
      loader = ParseMemeTypes;
    }));
   
    it('should parse meme types', function() {
      var returnMemes = loader.parseMemeTypesWithoutData();
      expect(returnMemes).toEqualData(globalMemeTypes);
    });
  });
});
