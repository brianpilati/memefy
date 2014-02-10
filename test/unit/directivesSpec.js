'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
  beforeEach(
    module(
      'memefy.directives', 
      'app/partials/navigation.html', 
      'app/partials/displayMeme.html', 
      'app/partials/displayType.html', 
      'memefy.services'
    )
  );

  var scope, element, template, memes, mockBackend, image, expectedMemes;

  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('mfNavigationButtons', function() {
    beforeEach(inject(function($compile, $rootScope, $templateCache, Meme) {
      template = $templateCache.get('app/partials/navigation.html');
      $templateCache.put('partials/navigation.html', template);
      scope = $rootScope;
      element = angular.element('<mf-navigation-buttons></mf-navigation-buttons>');
      $compile(element)($rootScope);
      memes = {
        "DosEquis": {
          "-adsfasdfasd1" : {lineOne: "1", lineTwo: "2"},
          "-adsfasdfasd2" : {lineOne: "3", lineTwo: "4"},
          "-adsfasdfasd3" : {lineOne: "5", lineTwo: "6"},
          "-adsfasdfasd4" : {lineOne: "7", lineTwo: "8"},
          "-adsfasdfasd5" : {lineOne: "9", lineTwo: "10"},
          "-adsfasdfasd6" : {lineOne: "11", lineTwo: "12"},
          "-adsfasdfasd7" : {lineOne: "13", lineTwo: "14"},
          "-adsfasdfasd8" : {lineOne: "15", lineTwo: "16"}
        }
      };

      expectedMemes = [{lineOne: '1', lineTwo: '2'}, {lineOne: '3', lineTwo: '4'}, {lineOne: '5', lineTwo: '6'}, {lineOne: '7', lineTwo: '8'}, {lineOne: '9', lineTwo: '10'}, {lineOne: '11', lineTwo: '12'}, {lineOne: '13', lineTwo: '14'}, {lineOne: '15', lineTwo: '16'}]; 
      Meme.setMemes(memes);
    }));

    it('should be replaced', inject(function(Meme) {
      scope.showLeftNavigation=false;
      scope.showRightNavigation=false;
      scope.$digest();
      expect($(element).find('div.leftNavigation').hasClass('ng-hide')).toBe(true);
      expect($(element).find('div.rightNavigation').hasClass('ng-hide')).toBe(true);
    }));

    it('should browse right', inject(function(Meme) {
      scope.showLeftNavigation=false;
      scope.showRightNavigation=true;
      
      scope.$digest();
      expect($(element).find('div.leftNavigation').hasClass('ng-hide')).toBe(true);
      expect($(element).find('div.rightNavigation').hasClass('ng-hide')).toBe(false);

      /*click right*/
      $(element).find('div.rightNavigation').click();
      expect(Meme.getMemes()).toEqualData([ { lineOne : '15', lineTwo : '16' } ]);

      expect(scope.showRightNavigation).toBe(false);
      expect(scope.showLeftNavigation).toBe(true);

      scope.$digest();

      expect($(element).find('div.leftNavigation').hasClass('ng-hide')).toBe(true);
      expect($(element).find('div.rightNavigation').hasClass('ng-hide')).toBe(false);
    }));

    it('should browse left', inject(function(Meme) {
      scope.showRightNavigation=false;
      scope.showLeftNavigation=true;

      scope.$digest();
      expect($(element).find('div.leftNavigation').hasClass('ng-hide')).toBe(false);
      expect($(element).find('div.rightNavigation').hasClass('ng-hide')).toBe(true);

      /*click left*/
      $(element).find('div.leftNavigation').click();
      expect(Meme.getMemes()).toEqualData(expectedMemes.splice(0,7));

      expect(scope.showRightNavigation).toBe(true);
      expect(scope.showLeftNavigation).toBe(false);

      scope.$digest();

      expect($(element).find('div.leftNavigation').hasClass('ng-hide')).toBe(false);
      expect($(element).find('div.rightNavigation').hasClass('ng-hide')).toBe(true);
    }));
  });

  describe('mfMemeDisplay', function() {
    beforeEach(inject(function($compile, $rootScope, $templateCache, Meme) {
      template = $templateCache.get('app/partials/displayMeme.html');
      $templateCache.put('partials/displayMeme.html', template);
      scope = $rootScope;
      element = angular.element('<mf-meme-display></mf-meme-display>');
      $compile(element)($rootScope);

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

      Meme.setMemes(memes);
    }));

    it('should display the first meme', inject(function(Meme) {
      scope.memes = Meme.getMemes();
      scope.meme = Meme.getMeme();
      scope.memeId = Meme.getImageId();
      scope.$digest();
      expect($(element).find('div.lineOne').html()).toBe('1');
      expect($(element).find('div.lineTwo').html()).toBe('2');
      expect($(element).find('img.memeImage').html()).toBe('');
      expect($(element).find('img.memeImage').attr('src')).toBe('/img/DosEquis.jpg');
    }));
  });

  describe('mfMemeTypesDisplay', function() {
    beforeEach(inject(function($compile, $rootScope, $templateCache, _$httpBackend_) {
      template = $templateCache.get('app/partials/displayType.html');
      $templateCache.put('partials/displayType.html', template);

      scope = $rootScope.$new();
      scope.memes = ['DosEquis', 'BurtReynolds'];

      element = angular.element("<div><mf-meme-types-display ng-Repeat='meme in memes'></mf-meme-types-display></div>");
      $compile(element)(scope);
    }));

    it('should display the first meme', inject(function() {
      scope.$digest();
      expect($($($(element).children('div')[0]).children('img')[0]).attr('src')).toBe('img/DosEquis.jpg');
      expect($($($(element).children('div')[1]).children('img')[0]).attr('src')).toBe('img/BurtReynolds.jpg');
    }));
  });
});
