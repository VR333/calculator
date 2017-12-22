(function(){
  require('../bower_components/angular/angular.js');
  require('./components/calculator/calculator.js');

  const app = angular.module('tester', ['calculator']);
})();
