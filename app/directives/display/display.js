(function(){
  const app = angular.module('display', []);
  
  app.directive('display', function(){
    return {
      restrict: 'E',
      bindings: {
        first: '=',
        second: '=',
        operator: '='
      },
      templateUrl: './app/directives/display/display.html',
      controller: function($scope) {},
      controllerAs: 'display'
    };
  });
})();
