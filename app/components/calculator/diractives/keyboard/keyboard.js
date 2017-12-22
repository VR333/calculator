(function(){
  const app = angular.module('keyboard', []);

  app.directive('keyboard', function(){
    return {
      restrict: 'E',
      templateUrl : './app/components/calculator/diractives/keyboard/keyboard.html',
      controllerAs: 'keyboard',
      bindToController: {
        first: '=',
        second: '=',
        operator: '='
      },
      controller: function() {}
    };
  });
})();
