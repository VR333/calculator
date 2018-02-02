import '../bower_components/angular/angular.js';
import {calculator} from './components/calculator/app.js';

const app = angular.module('tester', []);
const Calculator = calculator(app);

//= r.js

//= /test/test.js

var abc = {
	d: 4,
	b: 5,
	c: 6
};

console.log('**************************************************************************************');
