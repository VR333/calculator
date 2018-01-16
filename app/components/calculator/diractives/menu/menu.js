const app = angular.module('menu', []);

app.directive('menu', function(){
    return {
        restrict: 'E',
        bindToController: {
            active: '='
        },
        controllerAs: 'menu',
        controller: ctrl,
        templateUrl : './app/components/calculator/diractives/menu/menu.html'
    };

    function ctrl() {
        this.list = ['Calculator','Standard', 'Scientific', 'Programmer',
        'Date calculation', 'Converter','Currency', 'Volume', 'Length',
        'Weight and Mass', 'Temperature', 'Energy', 'Area', 'Speed', 'Time',
         'Power', 'Data', 'Pressure', 'Angle'];

        this.makeActiveTab = (event) => {
            if (event.currentTarget.className !== 'ng-scope title') {
                document.getElementsByClassName('active')[0]
                        .className = 'ng-scope version';
                event.currentTarget.className = 'ng-scope version active';
                this.active = event.currentTarget.innerText;
            }
        };
    }
});
