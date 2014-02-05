'use strict';

/* Controllers */

angular.module('memefy.controllers', [])
  .controller('displayMemes', ['$scope', 'memeFactory', function($scope, memeFactory) {
    $scope.memes = memeFactory.getMemes();
    $scope.meme = memeFactory.getMeme();
    $scope.showRightNavigation = memeFactory.showRightNavigation();
    $scope.showLeftNavigation = memeFactory.showLeftNavigation();
  }])
  .controller('navigationClick', ['$scope', 'memeFactory', function($scope, memeFactory) {
    $scope.clickLeftNavigation = function() {
      memeFactory.clickLeftNavigation();
      $scope.updateScope();
    }

    $scope.clickRightNavigation = function() {
      memeFactory.clickRightNavigation();
      $scope.updateScope();
    }

    $scope.updateScope = function() {
      $scope.memes = memeFactory.getMemes();
      $scope.meme = memeFactory.getMeme();
      $scope.showRightNavigation = memeFactory.showRightNavigation();
      $scope.showLeftNavigation = memeFactory.showLeftNavigation();
    }
  }])
  .controller('default', [function() {

  }]);
