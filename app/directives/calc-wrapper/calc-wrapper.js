(function(){
  // import * from './app/diractives/calc-display/calc-display.js';
  // import * from './app/diractives/calc-keyboard/calc-keyboard.js';
  // require('directives/calc-display/calc-display.js');
  // require('directives/calc-keyboard/calc-keyboard.js');
  let app = angular.module('calc-wrapper', []);
  app.directive('wrapper', function(){
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
