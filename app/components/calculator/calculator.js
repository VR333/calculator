(function(){
  require('./diractives/keyboard/keyboard.js');
  require('./diractives/button/button.js');
  require('./diractives/display/display.js');

  const app = angular.module('calculator', ['keyboard', 'display', 'buttons']);

  app.directive('calculator', function(){
    return {
      restrict: 'E',
      templateUrl : './app/components/calculator/calculator.html',
      controllerAs: 'ctrl',
      controller: function() {
        this.first = '0';
        this.second = '';
        this.operator = '';
      }
    };
  });
})();
