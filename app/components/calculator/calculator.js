require('./diractives/keyboard/keyboard.js');
require('./diractives/btn/btn.js');
require('./diractives/display/display.js');
require('./diractives/hat/hat.js');
require('./diractives/menu/menu.js');
require('./diractives/navigator/navigator.js');

const app = angular.module('calculator', ['keyboard', 'display', 'btn', 'hat', 'menu', 'navigator']);

app.directive('calculator', function(){
    return {
        restrict: 'E',
        templateUrl : './app/components/calculator/calculator.html',
        controllerAs: 'ctrl',
        controller: function($scope) {
            this.first = '0';
            this.second = '';
            this.operator = '';

            this.toggle = 0;

            $scope.$on('myevent', function(data){
                // console.log(data);
            });

            this.changeToggle = (value) => {
                this.toggle = value;

                if (this.toggle) {
                    document.getElementById('hider').style.left = '0px';
                } else {
                    document.getElementById('hider').style.left = '-250px';
                }
            };

            this.active = 'Standard';
        }
    };
});
