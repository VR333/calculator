(function(){
  require('./../bower_components/angular/angular.js');
  require('./directives/calc-wrapper/calc-wrapper.js');
  require('./directives/calc-display/calc-display.js');
  require('./directives/calc-keyboard/calc-keyboard.js');
  require('./directives/button/button.js');

  const app = angular.module('calculator-app', ['calculator', 'keyboard', 'display', 'buttons']);
})();
