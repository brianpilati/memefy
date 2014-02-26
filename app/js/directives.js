'use strict';

/* Directives */


angular.module('memefy.directives', [])
.directive('displayName', ['appName', function(appName) {
  return {
    restrict: 'E',
    replace: true,
    link: function(scope, elm, attrs) {
       elm.text(appName);
    }
  };
}])
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
        element.append("<div class='memeHover bg-info'>" + (scope.meme.title) + "</div>");
      };

      scope.memeMouseLeave = function() {
        $(element).find('.memeHover').remove();
      };
    }
  };
}])
.directive('mfMemeDisplay', ['Meme', function(Meme) {
  return {
    restrict: 'E',
    replace: true,
    transclude: false,
    templateUrl: 'partials/displayMeme.html',
    link: function(scope, element, attrs) {
      scope.showLargeImage = function() {
        if (attrs.index) {
          scope.switchMeme(attrs.index);
        }
      }
    }
  }
}]);
