(function(){
  let app = angular.module('keyboard', []);

  app.directive('keyboard', function(){
    return {
      restrict: 'E',
      templateUrl : './app/directives/calc-keyboard/calc-keyboard.html',
      controllerAs: 'keyboard',
      controller: function($scope) {}
    };
  });
})();
