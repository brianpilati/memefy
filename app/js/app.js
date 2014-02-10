'use strict';


// Declare app level module which depends on filters, and services
angular.module('memefy', [
  'ngRoute',
  'ngResource',
  'memefy.filters',
  'memefy.services',
  'memefy.directives',
  'memefy.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/displayMemes/:memeId', {
    templateUrl: 'partials/displayMemes.html', 
    controller: 'displayMemesByType',
    resolve: {
      memeFactory: function(GetAllMemesByType) {
        return GetAllMemesByType();
      }
    }
  })
  .when('/display', {
    templateUrl: 'partials/display.html', 
    controller: 'displayMemes',
    resolve: {
      memeFactory: function(GetAllMemes) {
        return GetAllMemes();
      }
    }
  })
  .when('/create', {
    templateUrl: 'partials/create.html', 
    controller: 'createMeme'
  })
  .otherwise({
    redirectTo: '/display'
  });
}]);
