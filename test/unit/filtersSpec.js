'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {
  beforeEach(module('memefy.filters'));

  var scope, element;

  describe('appropriate', function() {
    beforeEach(inject(function($rootScope, $compile) {
      scope = $rootScope.$new();
      scope.memeTypes = globalMemeTypes;
      scope.restrictAll = true;

      element = angular.element('<div><div ng-Repeat="meme in memeTypes | filter: restrictAll ? \'appropriate\' : \'\'">' + 
                  '{{meme.title}}' + 
                 '</div></div>');
      $compile(element)(scope);
    }));

    it('should limit the appropriate memes', inject(function() {
      scope.$digest();
      expect($(element.children('div')[0]).html()).toBe('Dos Equis');
      expect($(element.find('div')[1]).html()).toBe(undefined);
    }));
  });
});
