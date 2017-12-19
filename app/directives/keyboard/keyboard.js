(function(){
  const app = angular.module('keyboard', []);

  app.directive('keyboard', function(){
    return {
      restrict: 'E',
      templateUrl : './app/directives/keyboard/keyboard.html',
      controllerAs: 'keyboard',
      controller: function($scope) {}
    };
  });
})();
