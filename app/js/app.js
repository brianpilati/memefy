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
  $routeProvider.when('/', {
    templateUrl: 'partials/display.html', 
    controller: 'displayMemes',
    resolve: {
      memeFactory: function(GetAllMemes) {
        return GetAllMemes();
      }
    }
  })
  .otherwise({
    redirectTo: '/'
  });
}]);
