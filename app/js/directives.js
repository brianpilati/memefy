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
    controller: function($scope, $element, $attrs) {
      $scope.leftNavigation = function() {
        console.log("left navigation click");
        $scope.clickLeftNavigation($scope, Meme);
      }

      $scope.rightNavigation = function() {
        console.log("right navigation click");
        $scope.clickRightNavigation();
      }
    }
  };
}]);
