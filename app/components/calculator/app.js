module.exports = function (app) {
    require('./diractives/keyboard/keyboard.js')(app);
    require('./diractives/btn/btn.js')(app);
    require('./diractives/display/display.js')(app);
    require('./diractives/header/header.js')(app);
    require('./diractives/menu/menu.js')(app);
    require('./diractives/navigator/navigator.js')(app);
    require('./servises/calculate.js')(app);

    app.directive('calculator', function(){
        return {
            restrict: 'E',
            controllerAs: 'ctrl',
            controller: ctrl,
            templateUrl : './app/components/calculator/template.html'
        };

        function ctrl($scope) {}
    });
}
