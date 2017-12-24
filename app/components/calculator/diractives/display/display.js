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
      templateUrl: './app/components/calculator/diractives/display/display.html',
      controllerAs: 'display',
      controller: function() {},
    };
  });
})();
