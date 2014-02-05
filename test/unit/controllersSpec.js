'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {
  beforeEach(module('memefy.controllers', 'memefy.services'));

  var scope, ctrl;
  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('displayMemes', function() {
    var loader, meme;

    beforeEach(inject(function($controller, $rootScope, Meme) {
      scope = $rootScope.$new();
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

  describe('navigationClick', function() {
    var loader, memeFactory, memes, newMeme;

    beforeEach(inject(function($controller, $rootScope, Meme) {
      scope = $rootScope.$new();
      memes = [
        {lineOne: "1", lineTwo: "2"},
        {lineOne: "3", lineTwo: "4"},
        {lineOne: "5", lineTwo: "6"},
        {lineOne: "7", lineTwo: "8"},
        {lineOne: "9", lineTwo: "10"},
        {lineOne: "11", lineTwo: "12"},
        {lineOne: "13", lineTwo: "14"}
      ];
      newMeme = {lineOne: "15", lineTwo: "16"};
      memes.push(newMeme);
      memeFactory = Meme;
      memeFactory.setMemes(memes);
      ctrl = $controller('navigationClick', { $scope: scope, 'memeFactory' : memeFactory});
    }));

    it('should load one meme after right click', function() {
      expect(scope.memes).toEqualData(undefined);
      scope.clickRightNavigation();
      expect(scope.memes).toEqualData([newMeme]);
      expect(memeFactory.showLeftNavigation()).toBe(true);
      expect(memeFactory.showRightNavigation()).toBe(false);
    });

    it('should load all memes after left click', function() {
      expect(scope.memes).toEqualData(undefined);
      scope.clickRightNavigation();
      expect(scope.memes).toEqualData([newMeme]);
      expect(memeFactory.showLeftNavigation()).toBe(true);
      expect(memeFactory.showRightNavigation()).toBe(false);
      scope.clickLeftNavigation();
      expect(scope.memes).toEqualData(memes.slice(0,7));
      expect(memeFactory.showLeftNavigation()).toBe(false);
      expect(memeFactory.showRightNavigation()).toBe(true);
    });
 });
});
