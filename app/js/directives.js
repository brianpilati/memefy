'use strict';

/* Directives */


angular.module('memefy.directives', [])
.directive('navigationButtons', ['Meme', function(Meme) {
  return {
    restrict: 'E',
    replace: true,
    transclude: false,
    /*
    scope: {
      rightNavigation: '@=rightNavigation',
      leftNavigation: '@=leftNavigation'
    },
    */
    templateUrl: 'partials/navigation.html',
    controller: function($scope, $element, $attrs, Meme) {
      $scope.leftNavigation = function() {
        Meme.clickLeftNavigation();
        $scope.updateScope();
      }

      $scope.rightNavigation = function() {
        Meme.clickRightNavigation();
        $scope.updateScope();
      }

      $scope.updateScope = function() {
        $scope.memes = Meme.getMemes();
        $scope.meme = Meme.getMeme();
        $scope.showRightNavigation = Meme.showRightNavigation();
        $scope.showLeftNavigation = Meme.showLeftNavigation();
      }
    }
  };
}]);
