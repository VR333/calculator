export function Btn(app) {
    app.directive('btn', function(){
        return {
            scope: true,
            bindToController: {
                type: '@',
                value: '@',
                tooltip: '@'
            },
            restrict: 'E',
            controllerAs: 'ctrl',
            controller: ctrl,
            templateUrl: './app/components/calculator/diractives/btn/btn.html'
        };

        function ctrl(operationsService, $scope) {
            this.handleClick = () => {
                operationsService.btnClick(this.type, this.value);
                $scope.$emit('btnClick');
            };
        }
    });
}
