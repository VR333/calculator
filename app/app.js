(function(){
  require('./../bower_components/angular/angular.js');
  require('./directives/wrapper/wrapper.js');
  require('./directives/display/display.js');
  require('./directives/keyboard/keyboard.js');
  require('./directives/button/button.js');

  const app = angular.module('calculator-app', ['calculator', 'keyboard', 'display', 'buttons']);
})();
