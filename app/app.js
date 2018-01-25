import '../bower_components/angular/angular.js';
import {calculator} from './components/calculator/app.js';

const app = angular.module('tester', []);
const Calculator = calculator(app);
