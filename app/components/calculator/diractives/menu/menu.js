const app = angular.module('menu', []);

app.directive('menu', function(){
    return {
        restrict: 'E',
        controllerAs: 'menu',
        controller: menuCtrl,
        templateUrl : './app/components/calculator/diractives/menu/menu.html'
    };

    function menuCtrl() {
        this.list = ['Scientific', 'Programmer', 'Date calculation', 'Converter',
        'Currency', 'Volume', 'Length', 'Weight and Mass', 'Temperature',
        'Energy', 'Area', 'Speed', 'Time', 'Power', 'Data', 'Pressure', 'Angle'];
    }
});
