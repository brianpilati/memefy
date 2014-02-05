'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('memefy.services', ['ngResource', 'ngRoute']);

services.factory('Meme', [ function() {
  var _memes = undefined;
  var _memeDisplayCount = 7;
  var _currentMemeCounter = 0;
  var _currentMemeIndex = 0;

  return {

    setMemes : function(memes) {
      _memes = ((memes == 'null') ? []: memes);
    },

    addMeme: function(meme) {
      _currentMemeIndex = this._getTotalMemesLength();
      _memes.push(meme);
    },

    getMemes: function() {
      if (this.isAvailableMemes()) {
        var lowerBound = this._getLowerBound();
        var upperBound = this._getUpperBound();
        return _memes.slice(lowerBound, upperBound);
      } else {
        return undefined;
      }
    },

    getMeme: function() {
      if (this._isIndexValid(_currentMemeIndex)) {
        return _memes[_currentMemeIndex];
      } else {
        return undefined;
      }
    },

    clickRightNavigation : function() {
      if (this.showRightNavigation()) {
        _currentMemeCounter++;  
      }
      return this.getMemes();
    },

    clickLeftNavigation : function() {
      if (this.showLeftNavigation()) {
        _currentMemeCounter--;  
      }
      return this.getMemes();
    },

    showRightNavigation : function () {
      return ((this.getMemes() && this._getTotalMemesLength() > this._getNextCounter()) ? true : false);
    },

    showLeftNavigation : function () {
      return ((this.getMemes() && this._getTotalMemesLength() && _currentMemeCounter > 0) ? true : false);
    },

    isAvailableMemes : function() {
      return ((_memes && _memes.length) ? true : false);
    },
    
    _isIndexValid : function(index) {
      return (this.isAvailableMemes() && index < this._getTotalMemesLength() && index > -1);
    },

    _getNextCounter: function() {
      return (_currentMemeCounter + 1) * _memeDisplayCount;
    },

    _getCurrentCounter: function() {
      return _currentMemeCounter * _memeDisplayCount;
    },

    _getLowerBound: function() {
      return this._getCurrentCounter();
    },

    _getUpperBound: function() {
      var estimatedUpperBound = this._getNextCounter();
      return ((this._getTotalMemesLength() > estimatedUpperBound) ? estimatedUpperBound : this._getTotalMemesLength());
    },

    _getTotalMemesLength: function() {
      return _memes.length;
    }
  };
}]);

services.factory('GetAllMemes', ['$q', '$http', '$route', 'Meme', function($q, $http, $route, Meme) {
  return function() {
    var delay= $q.defer();
    $http (
      {
        method: 'GET', 
        url: "https://memefy.firebaseio.com/memes/" + $route.current.params.memeId + ".json" 
      }
    ).success(function(data, status, headers, config) {
      Meme.setMemes(data);
      delay.resolve(Meme);
    }).error(function(data, status, headers, config) {
        delay.reject('Unable to fetch memes');
    });

    return delay.promise;
  }
}]);

services.factory('persistMeme', ['$q', '$http', 'Meme', function($q, $http, Meme) {
  return function(memeId, newMeme) {
    var delay= $q.defer();
    $http (
      {
        method: 'POST', 
        url: "https://memefy.firebaseio.com/memes/" + memeId + ".json",
        data: newMeme
      }
    ).success(function(data, status, headers, config) {
      Meme.addMeme(data);
      delay.resolve(Meme);
    }).error(function(data, status, headers, config) {
        delay.reject('Unable to push memes');
    });

    return delay.promise;
  }
}]);
