'use strict';

/* Directives */


angular.module('memefy.directives', [])
.directive('mfNavigationButtons', ['Meme', function(Meme) {
  return {
    restrict: 'E',
    replace: true,
    transclude: false,
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
}])
.directive('mfMemeTypesDisplay', ['$location', function($location) {
  return {
    restrict: 'E',
    replace: true,
    transclude: false,
    templateUrl: 'partials/displayType.html',
    link: function(scope, element, attrs) {
      scope.viewClass = attrs.viewClass;
      scope.memeMouseEnter = function() {
        element.append("<div class='memeHover'>" + (scope.meme.title) + "</div>");
      };

      scope.memeMouseLeave = function() {
        $(element).find('.memeHover').remove();
      };
    }
  };
}])
.directive('mfMemeDisplay', [function() {
  return {
    restrict: 'E',
    replace: true,
    transclude: false,
    templateUrl: 'partials/displayMeme.html'
  }
}]);
