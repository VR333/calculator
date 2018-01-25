webpackHotUpdate(0,{

/***/ 7:
/***/ (function(module, exports) {

module.exports = function (app) {
  app.directive('display', function () {
    return {
      restrict: 'E',
      controllerAs: 'ctrl',
      controller: ctrl,
      templateUrl: './app/components/calculator/diractives/display/display.html'
    };

    function ctrl($scope, operationsService) {
      alert(3);
      this.topScreen = operationsService.getTopScreen();
      this.botScreen = operationsService.getBotScreen();
      $scope.$on('btnClick', event => {
        this.topScreen = operationsService.getTopScreen();
        this.botScreen = operationsService.getBotScreen();
      });
    }
  });
};

/***/ })

})
//# sourceMappingURL=0.758f7098922c955f0bda.hot-update.js.map