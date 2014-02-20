'use strict';

angular.module('app').config(function($stateProvider, $urlRouterProvider) {

  $stateProvider.state('route1', {
    url: 'route1',
    templateUrl: 'template/route1.html',
    controller: 'Route1Ctrl'
  });

  $stateProvider.state('route2', {
    url: '/route2',
    templateUrl: 'template/route2.html',
    controller: 'Route2Ctrl'
  });


  $stateProvider.state('main', {
    url: '/main',
    templateUrl: 'template/main.html',
    controller: 'MainCtrl'
  });

  $urlRouterProvider.when('', '/main');

})