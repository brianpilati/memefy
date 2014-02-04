'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
var services = angular.module('memefy.services', ['ngResource', 'ngRoute']);

services.factory('Meme', [ function() {
  var _memes = undefined;
  var _memeDisplayCount = 7;
  var _currentMemeCounter = 0;


  return {

    setMemes : function(memes) {
      _memes = ((memes == 'null') ? undefined : [memes]);
    },

    getMemes: function() {
      if (this.isAvailableMemes()) {
        var lowerBound = _currentMemeCounter;
        var upperBound = this._getUpperBound();
        return _memes.slice(lowerBound, upperBound);
      } else {
        return undefined;
      }
    },

    getMeme: function(index) {
      if (this._isIndexValid(index)) {
        return _memes[index];
      } else {
        return undefined;
      }
    },

    clickRightNavigation : function() {
      if (this.showRightNaviation()) {
        _currentMemeCounter++;  
      }
      return this.getMemes();
    },

    clickLeftNavigation : function() {
      if (_currentMemeCounter > 0) {
        _currentMemeCounter--;  
      }
      return this.getMemes();
    },

    showRightNavigation : function () {
      return ((this.getMemes() && this.getMemes().length > this._getNextCounter()) ? true : false);
    },

    showLeftNavigation : function () {
      return ((this.getMemes() && this.getMemes().length && _currentMemeCounter > 0) ? true : false);
    },

    isAvailableMemes : function() {
      return ((_memes && _memes.length) ? true : false);
    },
    
    _isIndexValid : function(index) {
      return (this.isAvailableMemes() && index < _memes.length && index > -1);
    },

    _getNextCounter: function() {
      return (_currentMemeCounter + 1) * _memeDisplayCount;
    },

    _getUpperBound: function() {
      var estimatedUpperBound = this._getNextCounter();
      return ((_memes.length > estimatedUpperBound) ? estimatedUpperBound : _memes.length);
    }
  };
}]);

/*
services.factory('DareTest', ['$resource', function($resource) {
  return $resource('/services/dareTest/:id', {id: '@id'}, 
    {put: {method: 'PUT', params: {id: '@id'}}}
  );  
}]);

services.factory('GetCustomer', ['Customer', '$route', '$q', function(Customer, $route, $q) {
  return function() {
    var delay = $q.defer();
    Customer.get({id: $route.current.params.customerId}, function(customer) {
      delay.resolve(customer);
    }, function() {
      delay.reject('Unable to fetch customer ' + $route.current.params.customerId);
    }); 
    return delay.promise;
  };  
}]);
*/

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
