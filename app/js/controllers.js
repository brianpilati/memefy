'use strict';

/* Data Object */
var memeDataObject = {
  'DosEquis' : {
    'title': 'Dos Equis',
    'tagLine' : 'I usually don\'t ...',
    'image': 'dosEquis.jpg',
    'memeTypeId': 'DosEquis'
  },
  'BurtReynolds' : {
    'title': 'Burt Reynolds',
    'tagLine' : 'Sexy as a Service',
    'image': 'burtReynolds.jpg',
    'memeTypeId': 'BurtReynolds'
  },
  'DrEvil' : {
    'title': 'Dr. Evil',
    'tagLine' : '"Really??"',
    'image': 'drEvil.jpg',
    'memeTypeId': 'DrEvil'
  },
  'HideYoKids' : {
    'title': 'Hide Yo Kids',
    'tagLine' : 'Hide Yo Kids',
    'image': 'hideYoKids.jpg',
    'memeTypeId': 'HideYoKids'
  },
  'HoneyBadger' : {
    'title': 'Honey Badger',
    'tagLine' : 'Honey Badger don\'t give a #@$%',
    'image': 'honeyBadger.jpg',
    'memeTypeId': 'HoneyBadger'
  },
  'Moe' : {
    'title': 'Moe',
    'tagLine' : 'Do-"Moe" says ...',
    'image': 'moe.jpg',
    'memeTypeId': 'Moe'
  },
  'OneDoesNotSimply' : {
    'title': 'One Does Not Simply',
    'tagLine' : 'One Does not Simply ...',
    'image': 'oneDoesNotSimply.jpg',
    'memeTypeId': 'OneDoesNotSimply'
  },
  'Yoda' : {
    'title': 'Yoda',
    'tagLine' : 'Easy ... Is not to meme',
    'image': 'yoda.jpg',
    'memeTypeId': 'Yoda'
  }
};

/* Controllers */

angular.module('memefy.controllers', [])
  .controller('displayMemesByType', ['$scope', 'memeFactory', function($scope, memeFactory) {
    $scope.memes = memeFactory.getMemes();
    $scope.meme = memeFactory.getMeme();
    $scope.showRightNavigation = memeFactory.showRightNavigation();
    $scope.showLeftNavigation = memeFactory.showLeftNavigation();
  }])
  .controller('displayMemes', ['$scope', '$location', 'memeTypes', function($scope, $location, memeTypes) {
    if (memeTypes) {
      $scope.memeTypes = memeTypes;
    } else {
      $location.path('/create');
    }
  }])
  .controller('createMeme', ['$scope', '$location', 'PersistMeme', 'ParseMemeTypes', function($scope, $location, PersistMeme, ParseMemeTypes) {
    $scope.memeTypes = ParseMemeTypes.parseMemeTypesWithoutData();

    $scope.memeClicked = function() {
      $scope.memeTypeId = this.meme.memeTypeId;
    };

    $scope.save = function() {
      var memeData = {
        'user' : $scope.user,
        'firstLine' : $scope.firstLine,
        'secondLine' : $scope.secondLine,
      }
      PersistMeme($scope.memeTypeId, memeData).then(function() {
        $location.path('/displayMemes/' + $scope.memeTypeId);
      });
    };
  }])
  .controller('default', [function() {

  }]);
