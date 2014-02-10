'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {
  beforeEach(module('memefy.controllers', 'memefy.services'));

  var scope, ctrl, location;
  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('displayMemesByType', function() {
    var loader, meme;

    beforeEach(inject(function($controller, $rootScope, Meme) {
      scope = $rootScope.$new();
      meme = Meme;
      meme.setMemes('null');
      ctrl = $controller('displayMemesByType', { $scope: scope, 'memeFactory' : meme});
    }));

    it('should load no memes', function() {
      expect(scope.memes).toBe(undefined);
    });

    it('should load no meme', function() {
      expect(scope.meme).toBe(undefined);
    });
  });

  describe('displayMemes', function() {
    var loader, memes, location;

    beforeEach(inject(function($controller, $rootScope, $location) {
      scope = $rootScope.$new();
      location = $location;
      memes = undefined;
      ctrl = $controller('displayMemes', { $scope: scope, $location: location, 'memes' : memes});
    }));

    it('should redirect to the create page', function() {
      expect(location.path()).toBe('/create');
    });
  });

  describe('displayMemes', function() {
    var loader, memes, location;

    beforeEach(inject(function($controller, $rootScope, $location) {
      scope = $rootScope.$new();
      location = $location;
      memes = ['dosEquis', 'burtReynolds'];
      ctrl = $controller('displayMemes', { $scope: scope, $location: location, 'memes' : memes});
    }));

    it('should load memes', function() {
      expect(location.path()).toBe('');
      expect(scope.memeTypes).toBe(memes);
    });
  });

  describe('createMeme', function() {
    var loader, meme, location, mockBackend;

    beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $location, PersistMeme, Meme) {
      scope = $rootScope.$new();
      location = $location;
      mockBackend = _$httpBackend_;
      loader = PersistMeme;
      meme = Meme;
      ctrl = $controller('createMeme', { $scope: scope, $location: location, 'PersistMeme' : loader});
    }));

    it('should persist a meme', function() {
      mockBackend.expectPOST('https://memefy.firebaseio.com/memes/DosEquis.json').respond('null');

      scope.memeId = 'DosEquis';
      scope.user = '1234';
      scope.firstLine = "I usually don't test my code ...";
      scope.secondLine = "but when I do, it's in production";
      scope.save();
      expect(location.path()).toBe('');

      mockBackend.flush();
      expect(location.path()).toBe('/displayMemes/' + scope.memeId);

      expect(meme.getMemes()).toEqualData([{'user': "1234", 'firstLine': "I usually don't test my code ...", 'secondLine': "but when I do, it's in production"}]);


    });
  });
});
