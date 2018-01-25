import {keyboard} from './diractives/keyboard/keyboard.js';
import {btn} from './diractives/btn/btn.js';
import {display} from './diractives/display/display.js';
import {header} from './diractives/header/header.js';
import {menu} from './diractives/menu/menu.js';
import {navigator} from './diractives/navigator/navigator.js';
import {calculate} from './servises/calculate.js';

export function calculator(app) {
    const Keyboard = keyboard(app);
    const Btn = btn(app);
    const Display = display(app);
    const Header = header(app);
    const Menu = menu(app);
    const Navigator = navigator(app);
    const Calculate = calculate(app);

    app.directive('calculator', function(){
        return {
            restrict: 'E',
            controllerAs: 'ctrl',
            controller: ctrl,
            templateUrl : './app/components/calculator/template.html'
        };

        function ctrl() {}
    });
}
