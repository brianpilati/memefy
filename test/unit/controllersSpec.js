'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {
  beforeEach(module('memefy.controllers', 'memefy.services'));

  var scope, ctrl, location, loader, memeTypes;
  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('mainController', function() {
    beforeEach(inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      ctrl = $controller('mainController', { $scope: scope});
    }));

    it('should be restricted', function() {
      expect(scope.restrict).toBe(true);
    });
  });

  describe('displayMemesByType', function() {
    var loader, meme;

    beforeEach(inject(function($controller, $rootScope, Meme, $location) {
      scope = $rootScope.$new();
      meme = Meme;
      meme.setMemes('DosEquis', 'null');
      location = $location;
      ctrl = $controller('displayMemesByType', { $scope: scope, 'location': location, 'memeFactory' : meme});
    }));

    it('should redirect to the display page', function() {
      expect(location.path()).toBe('/display');
    });
  });

  describe('displayMemesByType', function() {
    var loader, meme;

    beforeEach(inject(function($controller, $rootScope, Meme, $location) {
      scope = $rootScope.$new();
      meme = Meme;
      meme.setMemes('DosEquis', globalDosEquisMemes);
      location = $location;
      ctrl = $controller('displayMemesByType', { $scope: scope, 'location': null, 'memeFactory' : meme});
    }));

    it('should redirect to the display page', function() {
      var displayMemes = expectedDosEquisMemes.slice(0);
      expect(scope.memes).toEqualData(displayMemes);
    });

    it('should load a meme', function() {
      var expectedMeme = expectedDosEquisMemes.slice(0,1).pop();
      expect(scope.meme).toEqualData(expectedMeme);
    });

    it('should load no right navigation', function() {
       expect(scope.showRightNavigation).toBe(false);
    });

    it('should load no left navigation', function() {
       expect(scope.showLeftNavigation).toBe(false);
    });

    it('should have an image', function() {
       expect(scope.image).toBe('dosEquis.jpg');
    });
  });

  describe('displayMemes', function() {
    beforeEach(inject(function($controller, $rootScope, $location) {
      scope = $rootScope.$new();
      location = $location;
      memeTypes = undefined;
      ctrl = $controller('displayMemes', { $scope: scope, $location: location, 'memeTypes' : memeTypes});
    }));

    it('should redirect to the create page', function() {
      expect(location.path()).toBe('/create');
    });
  });

  describe('displayMemes', function() {
    beforeEach(inject(function($controller, $rootScope, $location) {
      scope = $rootScope.$new();
      location = $location;
      memeTypes = globalMemeTypes;
      ctrl = $controller('displayMemes', { $scope: scope, $location: location, 'memeTypes' : memeTypes});
    }));

    it('should load memes', function() {
      expect(location.path()).toBe('');
      expect(scope.memeTypes).toBe(globalMemeTypes);
    });

    it('should click on a meme', function() {
      scope.meme = globalMemeTypes[0];
      scope.memeClicked();
      expect(location.path()).toBe('/displayMemes/DosEquis');
    });
  });

  describe('createMeme', function() {
    var loader, meme, location, mockBackend;

    beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $location, PersistMeme, Meme, ParseMemeTypes) {
      scope = $rootScope.$new();
      location = $location;
      mockBackend = _$httpBackend_;
      loader = PersistMeme;
      meme = Meme;
      ctrl = $controller('createMeme', { $scope: scope, $location: location, 'PersistMeme' : loader, 'ParseMemeTypes': ParseMemeTypes});
    }));

    it('should have meme types', function() {
      expect(scope.memeTypes).toEqualData(globalMemeTypes);
      expect(scope.createMeme).toBe(false);
      expect(scope.pageName).toBe("Create Meme");
    });

    it('should have memeTypeId after clicking an image', function() {
      scope.meme = globalMemeTypes[0];
      scope.lineOne = "lineOne";
      scope.lineTwo = "lineTwo";

      expect(scope.lineOne).toBe('lineOne');
      expect(scope.lineTwo).toBe('lineTwo');

      scope.memeClicked();
      expect(scope.memeTypeId).toBe('DosEquis');
      expect(scope.image).toBe('dosEquis.jpg');
      expect(scope.createMeme).toBe(true);
      expect(scope.lineOne).toBe('');
      expect(scope.lineTwo).toBe('');
    });

    it('should persist a meme', function() {
      mockBackend.expectPOST('https://memefy.firebaseio.com/memes/DosEquis.json').respond('null');

      scope.memeTypeId = 'DosEquis';
      scope.user = '1234';
      scope.lineOne = "I usually don't test my code ...";
      scope.lineTwo = "but when I do, it's in production";
      scope.save();
      expect(location.path()).toBe('');

      mockBackend.flush();
      expect(location.path()).toBe('/displayMemes/' + scope.memeTypeId);

      expect(meme.getMemes()).toEqualData([{'user': "1234", 'lineOne': "I usually don't test my code ...", 'lineTwo': "but when I do, it's in production"}]);
    });
  });
});
