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
      alert(2);
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
//# sourceMappingURL=0.6abb5141906fc3ec8c47.hot-update.js.map