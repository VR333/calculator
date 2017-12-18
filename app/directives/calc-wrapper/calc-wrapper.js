(function(){
  let app = angular.module('calculator', []);
  app.directive('calculator', function(){
    return {
      restrict: 'E',
      templateUrl : './app/directives/calc-wrapper/calc-wrapper.html',
      controllerAs: 'ctrl',
      controller: function($scope) {
        $scope.first = '0';
        $scope.second = '';
        $scope.operator = '';
      }
    };
  });
})();
