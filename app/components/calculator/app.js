import {Keyboard} from './diractives/keyboard/keyboard.js';
import {Btn} from './diractives/btn/btn.js';
import {Display} from './diractives/display/display.js';
import {Header} from './diractives/header/header.js';
import {Menu} from './diractives/menu/menu.js';
import {Navigator} from './diractives/navigator/navigator.js';
import {Calculate} from './servises/calculate.js';

export function Calculator(app) {
    const keyboard = Keyboard(app);
    const btn = Btn(app);
    const display = Display(app);
    const header = Header(app);
    const menu = Menu(app);
    const navigator = Navigator(app);
    const calculate = Calculate(app);

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
