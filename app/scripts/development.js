angular.module('development', [])
  .config(function($logProvider) {

  })
  .run(function($rootScope, $log, $location, $window) {
    $window.missingTranslations = [];

    $window.development = $rootScope.develop = $rootScope.development = (function() {
      return $location.host().match(/localhost/) || $location.host().match(/staging/);
    }());

    // this is for measuring performance
    $log.debug('development module running');

    //get a service in the console for testing
    $window.getSrv = function(name, element) {
      element = element || '*[ng-app]';
      return angular.element(element).injector().get(name);
    }

    if (!development) {
      window.console = {
        log: function() {}
      };
    }

    var inc = 0;
    var printDigest = _.throttle(function() {
      var target = $rootScope,
        current = target,
        next;
      var watchers = 0;
      do {
        watchers += current.$$watchers && current.$$watchers.length;
        if (!(next = (current.$$childHead || (current !== target && current.$$nextSibling)))) {
          while (current !== target && !(next = current.$$nextSibling)) {
            current = current.$parent;
          }
        }
      } while ((current = next));
      // $log.debug('$rootScope.$digest ' + inc + ' watchers: ' + watchers);

    }, 3000);
    $rootScope.$watch(function() {
      inc++;
      printDigest();
      return null;
    });

  })
  .run(function($timeout, $log) {
    $timeout(function() {
      $log.debug('total number of scopes / bindings: ' + $('.ng-scope').length + ' / ' + $('.ng-binding').length);
    }, 8000);
  })
  .run(function(globals, courseService, $log) {
    window.glo = globals;
  });