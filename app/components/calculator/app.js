require('./diractives/keyboard/keyboard.js');
require('./diractives/btn/btn.js');
require('./diractives/display/display.js');
require('./diractives/header/header.js');
require('./diractives/menu/menu.js');
require('./diractives/navigator/navigator.js');

const app = angular.module('calculator', ['keyboard', 'display', 'btn', 'header', 'menu', 'navigator']);

app.directive('calculator', function(){
    return {
        restrict: 'E',
        templateUrl : './app/components/calculator/template.html',
        controllerAs: 'ctrl',
        controller: function($scope) {
            this.first = '0';
            this.second = '';
            this.operator = '';



            $scope.$on('myevent', function(data){
                // console.log(data);
            });
        }
    };
});
