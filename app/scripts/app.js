'use strict';

// Declare app level module which depends on filters, and services
angular.module('app', ['app.filters', 'app.services', 'app.directives', 'app.animations',
  'app.controllers', 'app.decorators', 'ui.bootstrap', 'ngRoute', 'ngDragDrop', 'ngAnimate-animate.css', 'development', 'ui.router',
  'ngCookies', 'app.templates'
]).config(function($httpProvider) {
  $httpProvider.defaults.withCredentials = true;

}).run(function($rootScope, $location, $log) {

});

angular.module('app.controllers', []);
angular.module('app.filters', []);
angular.module('app.services', ['ngLocale']);
angular.module('app.decorators', []);
angular.module('app.directives', []);
angular.module('app.animations', []);