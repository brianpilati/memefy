'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
  beforeEach(module('memefy.directives', 'app/partials/navigation.html', 'memefy.services'));

  var scope, element, template, meme;

  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('navigationButtons', function() {
    beforeEach(inject(function($compile, $rootScope, $templateCache) {
      template = $templateCache.get('app/partials/navigation.html');
      $templateCache.put('partials/navigation.html', template);
      scope = $rootScope;
      element = angular.element('<navigation-buttons></navigation-buttons>');
      $compile(element)($rootScope);
    }));

    it('should be replaced', inject(function(Meme) {
      scope.$digest();
      expect(element.find('div').hasClass('leftNavigation')).toBe(true);
      expect(element.find('div').hasClass('ng-hide')).toBe(true);
      expect(element.find('div').next().hasClass('rightNavigation')).toBe(true);
      expect(element.find('div').next().hasClass('ng-hide')).toBe(true);

      element.find('div')[0].click();
      element.attr('show');
    }));
  });
});
