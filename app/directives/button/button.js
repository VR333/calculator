(function(){
  let app = angular.module('calc-button', []);
  app.directive('button', function(){
    return {
      restrict: 'E',
      templateUrl: './app/directives/button/button.html',
      controller: function($scope) {
        this.digits = ['0','1','2','3','4','5','6','7','8','9'];
        this.operators = ['+','-','*','/', '%'];
        this.toggle = true;

        this.handleEquilButton = () => {
          if ($scope.second === '.') {
            $scope.second = '0';
          }
          if ($scope.operator && $scope.second) {
            this.makeSomeMath($scope.operator);
          }
        };

        this.handleDecimalDot = dot => {
          if ( this.toggle && !$scope.first.includes('.') ) {
            return $scope.first = $scope.first.concat(dot);
          }
          if ( $scope.operator && !$scope.second.includes('.') ) {
            $scope.second = $scope.second.concat(dot);
          }

        };

        this.setValue = value => {
          if (this.toggle) {
            return this.setFirstOperand(value);
          }
          this.setSecondOperand(value);
        };

        this.setFirstOperand = firstOperand => {
          if ($scope.first === '0') {
            return $scope.first = firstOperand;
          }
          $scope.first = $scope.first.concat(firstOperand);
        };

        this.setSecondOperand = secondOperand => {
          if ($scope.second == '') {
            return $scope.second = secondOperand;
          }
          $scope.second = $scope.second.concat(secondOperand);
        };

        this.setOperator = operator => {
          if ( this.checkForMinusNumber(operator) ) {
            return true;
          }

          if ($scope.first === '-' || $scope.first === '-.') {
            $scope.first = '0';
          }

          $scope.operator = operator;
          this.toggle = false;
        };

        this.checkForMinusNumber = minus => {
          let condition = !$scope.first.includes('-') && $scope.first === '0';
            if (minus === '-' && this.toggle && condition) {
              $scope.first = minus;
              return true;
            }
            return false;
        };

        this.makeSomeMath = value => {
          switch($scope.operator) {
            case '+':
                    this.add();
                    break;
            case '*':
                    this.multiple();
                    break;
            case '-':
                    this.minus();
                    break;
            case '/':
                    this.divide();
                    break;
            case '%':
                    this.module();
                    break;
            }
            $scope.second = '';
            $scope.operator = '';
            this.toggle = true;
        };

        this.add = () => {
          $scope.first = Number($scope.first) + Number($scope.second);
        };

        this.multiple = () => {
          $scope.first = Number($scope.first) * Number($scope.second);
        };

        this.minus = () => {
          $scope.first =  Number($scope.first) - Number($scope.second);
        };

        this.divide = () => {
          $scope.first = Number($scope.first) / Number($scope.second);
        };

        this.module = () => {
          $scope.first = Number($scope.first) % Number($scope.second);
        };

        this.IsInputNaN = input => isNaN(Number(input));

        this.reset = () => {
          $scope.first = '0';
          $scope.second = '';
          $scope.operator = undefined;
          this.toggle = true;
        };

        this.back = () => {
          if (this.toggle) {
            if ($scope.first.length === 1) {
              $scope.first = '0';
              return true;
            }
            $scope.first = $scope.first.slice(0, -1);
            return true;
          }

          if ($scope.second.length === 1) {
              $scope.second = '';
              return true;
          }
          $scope.second = $scope.second.slice(0, -1);
        };
      },
      controllerAs: 'button'
    };
  });
})();
