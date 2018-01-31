import '../bower_components/angular/angular.js';
import '../bower_components/angular-route/angular-route.js';
import {calculator} from './components/calculator/app.js';
import {distance} from './components/googleApi/app.js';

const app = angular.module('tester', ['ngRoute']);
const Calculator = calculator(app);
const Distance = distance(app);

app.config( ['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/calculator', {
    templateUrl: './app/components/calculator/rename.html'
  })
  .when('/googleApi', {
    templateUrl: './app/components/googleApi/rename.html'
  })
  .otherwise({
    redirectTo: '/'
  });
}]);
