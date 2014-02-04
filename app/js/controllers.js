'use strict';

/* Controllers */

angular.module('memefy.controllers', [])
  .controller('displayMemes', ['$scope', 'memeFactory', function($scope, memeFactory) {
    $scope.memes = memeFactory.getMemes();
    $scope.meme = memeFactory.getMeme(0);

  }])
  .controller('default', [function() {

  }]);
