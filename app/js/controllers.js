'use strict';

/* Controllers */

angular.module('memefy.controllers', [])
  .controller('displayMemesByType', ['$scope', 'memeFactory', function($scope, memeFactory) {
    $scope.memes = memeFactory.getMemes();
    $scope.meme = memeFactory.getMeme();
    $scope.showRightNavigation = memeFactory.showRightNavigation();
    $scope.showLeftNavigation = memeFactory.showLeftNavigation();
  }])
  .controller('displayMemes', ['$scope', '$location', 'memes', function($scope, $location, memeTypes) {
    if (memeTypes) {
      $scope.memeTypes = memeTypes;
    } else {
      $location.path('/create');
    }
  }])
  .controller('createMeme', ['$scope', '$location', 'PersistMeme', function($scope, $location, PersistMeme) {
    $scope.save = function() {
      var memeData = {
        'user' : $scope.user,
        'firstLine' : $scope.firstLine,
        'secondLine' : $scope.secondLine,
      }
      PersistMeme($scope.memeId, memeData).then(function() {
        $location.path('/displayMemes/' + $scope.memeId);
      });
    }
  }])
  .controller('default', [function() {

  }]);
