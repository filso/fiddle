window.isDefined = angular.isDefined;

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}


_.mixin({
  'capitalize': function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
});
