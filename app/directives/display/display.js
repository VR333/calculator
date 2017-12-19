(function(){
  const app = angular.module('display', []);
  
  app.directive('display', function(){
    return {
      restrict: 'E',
      bindToController: {
        first: '=',
        second: '=',
        operator: '='
      },
      templateUrl: './app/directives/display/display.html',
      controller: function() {},
      controllerAs: 'display'
    };
  });
})();
