'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('memefy.services', ['ngResource', 'ngRoute']);

services.value('appName', 'Memefy');

services.factory('Meme', [ function() {
  var _memes = [];
  var _memeDisplayCount = 7;
  var _currentMemeCounter = 0;
  var _currentMemeIndex = 0;
  var _imageId = undefined;

  return {
    setMemes : function(memeId, memes) {
      var self = this;
      if (memes != 'null') {
        self._setImageId(memeDataObject[memeId].image);
        _memes = _.map(memes, function(meme, key) { 
          return meme; 
        })
      }
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

    setCurrentIndex: function(index) {
      _currentMemeIndex = index;
      return this.getMeme();
    },

    getImageId: function() {
      return (_imageId ? _imageId : _imageId);
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

    _setImageId: function(imageId) {
      _imageId = imageId;
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

services.factory('ParseMemeTypes',[ function() {
  return {
    parseMemeTypesWithoutData: function() {
      return _.map(memeDataObject, function(object, key){ return object; });
    },

    parseMemeTypesWithData: function(data) {
      return (data == "null" ? undefined : _.map(data, function(object, key){ return memeDataObject[key]; }));
    }
  }

}]);

services.factory('GetAllMemes', ['$q', '$http', 'ParseMemeTypes', function($q, $http, ParseMemeTypes) {
  return function() {
    var delay= $q.defer();
    $http (
      {
        method: 'GET', 
        url: "https://memefy.firebaseio.com/memes.json" 
      }
    ).success(function(data, status, headers, config) {
      var returnData = ParseMemeTypes.parseMemeTypesWithData(data);
      delay.resolve(returnData);
    }).error(function(data, status, headers, config) {
        delay.reject('Unable to fetch memes');
    });

    return delay.promise;
  }
}]);

services.factory('GetAllMemesByType', ['$q', '$http', '$route', 'Meme', function($q, $http, $route, Meme) {
  return function() {
    var delay= $q.defer();
    var memeId = $route.current.params.memeId;
    $http (
      {
        method: 'GET', 
        url: "https://memefy.firebaseio.com/memes/" + memeId + ".json" 
      }
    ).success(function(data, status, headers, config) {
      Meme.setMemes(memeId, data);
      delay.resolve(Meme);
    }).error(function(data, status, headers, config) {
        delay.reject('Unable to fetch memes by type');
    });

    return delay.promise;
  }
}]);

services.factory('PersistMeme', ['$q', '$http', 'Meme', function($q, $http, Meme) {
  return function(memeId, newMeme) {
    var delay= $q.defer();
    $http (
      {
        method: 'POST', 
        url: "https://memefy.firebaseio.com/memes/" + memeId + ".json",
        data: newMeme
      }
    ).success(function(data, status, headers, config) {
      Meme.addMeme(newMeme);
      delay.resolve(Meme);
    }).error(function(data, status, headers, config) {
        delay.reject('Unable to push memes');
    });

    return delay.promise;
  }
}]);
