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

  var scope, element, template, memes, mockBackend, image;

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
      scope = $rootScope.$new();
      element = angular.element('<mf-navigation-buttons></mf-navigation-buttons>');
      $compile(element)(scope);
      Meme.setMemes('DosEquis', globalNewDosEquisMemes);
    }));

    it('should be replaced', inject(function(Meme) {
      scope.showLeftNavigation=false;
      scope.showRightNavigation=false;
      scope.$digest();
      expect($(element).find('div.memeChevronLeft').hasClass('ng-hide')).toBe(true);
      expect($(element).find('div.memeChevronRight').hasClass('ng-hide')).toBe(true);
    }));

    it('should browse right', inject(function(Meme) {
      scope.showLeftNavigation=false;
      scope.showRightNavigation=true;
      
      scope.$digest();
      expect($(element).find('div.memeChevronLeft').hasClass('ng-hide')).toBe(true);
      expect($(element).find('div.memeChevronRight').hasClass('ng-hide')).toBe(false);

      /*click right*/
      $(element).find('div.memeChevronRight').click();
      expect(Meme.getMemes()).toEqualData([ { lineOne : '15', lineTwo : '16' } ]);

      expect(scope.showRightNavigation).toBe(false);
      expect(scope.showLeftNavigation).toBe(true);

      scope.$digest();

      expect($(element).find('div.memeChevronLeft').hasClass('ng-hide')).toBe(true);
      expect($(element).find('div.memeChevronRight').hasClass('ng-hide')).toBe(false);
    }));

    it('should browse left', inject(function(Meme) {
      scope.showRightNavigation=false;
      scope.showLeftNavigation=true;

      scope.$digest();
      expect($(element).find('div.memeChevronLeft').hasClass('ng-hide')).toBe(false);
      expect($(element).find('div.memeChevronRight').hasClass('ng-hide')).toBe(true);

      /*click left*/
      $(element).find('div.memeChevronLeft').click();
      expect(Meme.getMemes()).toEqualData(expectedNewDosEquisMemes.splice(0,7));

      expect(scope.showRightNavigation).toBe(true);
      expect(scope.showLeftNavigation).toBe(false);

      scope.$digest();

      expect($(element).find('div.memeChevronLeft').hasClass('ng-hide')).toBe(false);
      expect($(element).find('div.memeChevronRight').hasClass('ng-hide')).toBe(true);
    }));
  });

  describe('mfMemeDisplay', function() {
    beforeEach(inject(function($compile, $rootScope, $templateCache, Meme) {
      template = $templateCache.get('app/partials/displayMeme.html');
      $templateCache.put('partials/displayMeme.html', template);
      scope = $rootScope;
      scope.switchMeme = function() {};
      element = angular.element('<mf-meme-display index="1"></mf-meme-display>');
      $compile(element)(scope);

      Meme.setMemes('DosEquis', globalDosEquisMemes);
    }));

    it('should display the first meme', inject(function(Meme) {
      scope.memes = Meme.getMemes();
      scope.meme = Meme.getMeme();
      scope.image = Meme.getImageId();
      scope.$digest();
      expect($(element).find('div.memeLineOne').html()).toBe('1');
      expect($(element).find('div.memeLineTwo').html()).toBe('2');
      expect($(element).find('img.memeImage').html()).toBe('');
      expect($(element).find('img.memeImage').attr('src')).toBe('/img/dosEquis.jpg');
    }));

    it('should click on a meme and display it', inject(function(Meme) {
      spyOn(scope, 'switchMeme');
      scope.memes = Meme.getMemes();
      scope.meme = Meme.getMeme();
      scope.image = Meme.getImageId();
      scope.$digest();
      scope.showLargeImage();
      expect(scope.switchMeme).toHaveBeenCalled();
    }));
  });

  describe('mfMemeTypesDisplay', function() {
    var compile;
    beforeEach(inject(function($compile, $rootScope, $templateCache) {
      compile = $compile;
      template = $templateCache.get('app/partials/displayType.html');
      $templateCache.put('partials/displayType.html', template);

      scope = $rootScope.$new();
      scope.memeTypes = globalMemeTypes;

      element = angular.element("<div><mf-meme-types-display ng-Repeat='meme in memeTypes' view-class='memeDisplayTypeImage'></mf-meme-types-display></div>");
      $compile(element)(scope);
    }));

    it('should display the first meme', inject(function() {
      scope.$digest();
      expect($($($(element).children('div')[0]).children('img')[0]).attr('src')).toBe('img/dosEquis.jpg');
      expect($($($(element).children('div')[1]).children('img')[0]).attr('src')).toBe('img/burtReynolds.jpg');
    }));

    it('should have an isolate class', inject(function() {
      scope.$digest();
      expect($(element).children('div').hasClass('memeDisplayTypeImage')).toBe(true);;
    }));

    it('should display the title', inject(function() {
      scope.$digest();

      var currentElement = $($(element).children('div')[0])[0];
      var newElement = compile(currentElement)(scope);
      var directiveScope = newElement.scope();
      directiveScope.memeMouseEnter();
      directiveScope.$digest();
      expect($($(currentElement).find('.memeHover')[0]).html()).toBe('Dos Equis');
    }));

    it('should remove the title', inject(function() {
      scope.$digest();
      var currentElement = $($(element).children('div')[0])[0];
      var newElement = compile(currentElement)(scope);
      var directiveScope = newElement.scope();
      directiveScope.memeMouseEnter();
      directiveScope.$digest();
      expect($($(currentElement).find('.memeHover')[0]).html()).toBe('Dos Equis');

      directiveScope.memeMouseLeave();
      directiveScope.$digest();
      expect($(currentElement).hasClass('.memeHover')).toBe(false);
    }));
  });
});
