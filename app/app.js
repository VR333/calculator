import '../bower_components/angular/angular.js';
import {Calculator} from './components/calculator/app.js';

const app = angular.module('tester', []);
const calculator = Calculator(app);
