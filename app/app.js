import '../bower_components/angular/angular.js';

const app = angular.module('tester', []);
require ('./components/calculator/app.js')(app);
