'use strict';

/* Data Object */
var memeDataObject = {
  'DosEquis' : {
    'title': 'Dos Equis',
    'tagLine' : 'I usually don\'t ...',
    'image': 'dosEquis.jpg',
    'memeTypeId': 'DosEquis',
    'rating': 'appropriate'
  },
  'BurtReynolds' : {
    'title': 'Burt Reynolds',
    'tagLine' : 'Sexy as a Service',
    'image': 'burtReynolds.jpg',
    'memeTypeId': 'BurtReynolds',
    'rating': 'restricted'
  },
  'DrEvil' : {
    'title': 'Dr. Evil',
    'tagLine' : '"Really??"',
    'image': 'drEvil.jpg',
    'memeTypeId': 'DrEvil',
    'rating': 'appropriate'
  },
  'HideYoKids' : {
    'title': 'Hide Yo Kids',
    'tagLine' : 'Hide Yo Kids',
    'image': 'hideYoKids.jpg',
    'memeTypeId': 'HideYoKids',
    'rating': 'appropriate'
  },
  'HoneyBadger' : {
    'title': 'Honey Badger',
    'tagLine' : 'Honey Badger don\'t give a #@$%',
    'image': 'honeyBadger.jpg',
    'memeTypeId': 'HoneyBadger',
    'rating': 'appropriate'
  },
  'Moe' : {
    'title': 'Moe',
    'tagLine' : 'Do-"Moe" says ...',
    'image': 'moe.jpg',
    'memeTypeId': 'Moe',
    'rating': 'appropriate'
  },
  'OneDoesNotSimply' : {
    'title': 'One Does Not Simply',
    'tagLine' : 'One Does not Simply ...',
    'image': 'oneDoesNotSimply.jpg',
    'memeTypeId': 'OneDoesNotSimply',
    'rating': 'appropriate'
  },
  'Yoda' : {
    'title': 'Yoda',
    'tagLine' : 'Easy ... Is not to meme',
    'image': 'yoda.jpg',
    'memeTypeId': 'Yoda',
    'rating': 'appropriate'
  }
};

/* Controllers */

angular.module('memefy.controllers', [])
  .controller('mainController', ['$scope', function($scope) {
     $scope.restrict = true;
  }])
  .controller('displayMemesByType', ['$scope', '$location', 'memeFactory', function($scope, $location, memeFactory) {
    if (memeFactory.isAvailableMemes()) {
      $scope.memes = memeFactory.getMemes();
      $scope.meme = memeFactory.getMeme();
      $scope.showRightNavigation = memeFactory.showRightNavigation();
      $scope.showLeftNavigation = memeFactory.showLeftNavigation();
      $scope.image = memeFactory.getImageId();
    } else {
      $location.path('/display');
    }
  }])
  .controller('displayMemes', ['$scope', '$location', 'memeTypes', function($scope, $location, memeTypes) {
    if (memeTypes) {
      $scope.memeTypes = memeTypes;
    } else {
      $location.path('/create');
    }

    $scope.memeClicked = function() {
      $location.path('/displayMemes/' + this.meme.memeTypeId);
    }
  }])
  .controller('createMeme', ['$scope', '$location', 'PersistMeme', 'ParseMemeTypes', function($scope, $location, PersistMeme, ParseMemeTypes) {
    $scope.memeTypes = ParseMemeTypes.parseMemeTypesWithoutData();
    $scope.createMeme = false;
    $scope.pageName = "Create Meme";

    $scope.memeClicked = function() {
      $scope.memeTypeId = this.meme.memeTypeId;
      $scope.image = this.meme.image;
      $scope.createMeme = true;
      $scope.lineOne = "";
      $scope.lineTwo = "";
    };

    $scope.save = function() {
      var memeData = {
        'user' : $scope.user,
        'lineOne' : $scope.lineOne,
        'lineTwo' : $scope.lineTwo
      }
      PersistMeme($scope.memeTypeId, memeData).then(function() {
        $location.path('/displayMemes/' + $scope.memeTypeId);
      });
    };
  }])
  .controller('default', [function() {

  }]);
