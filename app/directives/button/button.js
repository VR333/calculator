(function(){
  let app = angular.module('calc-button', []);
  app.directive('button', function(){
    return {
      restrict: 'E',
      templateUrl: './app/directives/button/button.html',
      controller: function($scope) {

        // hard-code data

        this.digits = ['0','1','2','3','4','5','6','7','8','9'];
        this.operators = ['+','-','*','/', '%'];
        this.toggle = true;

        // check for proper action if both operands and operator were chosen

        this.handleEquilButton = () => {
          if ($scope.second === '.') {
            $scope.second = '0';
          }
          if ($scope.operator && $scope.second) {
            this.makeSomeMath($scope.operator);
          }
        };

        // check for proper dot(.) usage..

        this.handleDecimalDot = dot => {
          if ( this.toggle && !$scope.first.includes('.') ) {
            return $scope.first = $scope.first.concat(dot);
          }
          if ( $scope.operator && !$scope.second.includes('.') ) {
            $scope.second = $scope.second.concat(dot);
          }

        };

        // find out: first or second operand is adding..

        this.setValue = value => {
          if (this.toggle) {
            return this.setFirstOperand(value);
          }
          this.setSecondOperand(value);
        };

        // Set value for $scope.first variable

        this.setFirstOperand = firstOperand => {
          if ($scope.first === '0') {
            return $scope.first = firstOperand;
          }
          $scope.first = $scope.first.concat(firstOperand);
        };

        // Set value for $scope.second variable

        this.setSecondOperand = secondOperand => {
          if ($scope.second == '' || $scope.second == '0') {
            return $scope.second = secondOperand;
          }
          $scope.second = $scope.second.concat(secondOperand);
        };

        // Set value for $scope.operator variable and check $scope.first

        this.setOperator = operator => {
          if ( this.checkForMinusNumber(operator) ) {
            return true;
          }

          if ($scope.first === '-' || $scope.first === '-.') {
            $scope.first = '0';
          }

          if ($scope.second && $scope.operator) {
            return this.actionPlusChooseNextOperator(operator);
          }

          $scope.operator = operator;
          this.toggle = false;
        };

        // check if user want to use minus number for operation

        this.checkForMinusNumber = minus => {
            if (minus === '-' && this.toggle
                && !$scope.first.includes('-')
                && $scope.first === '0'
              ) {
                $scope.first = minus;
                return true;
            }
            return false;
        };

        // check operator and use proper action

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
        /*
        * start makeSomeMath() when both operands and operator is present
        * and choose clicked operator for next action
        */

        this.actionPlusChooseNextOperator = operator => {
          if ($scope.second === '.') {
            $scope.second = '0';
          }
          this.makeSomeMath(operator);
          $scope.operator = operator;
          this.toggle = false;
        };

        // arithmetic operations to be done with makeSomeMath() execution

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

        // Check if input value is non-digit one

        this.IsInputNaN = input => isNaN(Number(input));

        // clear calculator operands and operator

        this.reset = () => {
          $scope.first = '0';
          $scope.second = '';
          $scope.operator = undefined;
          this.toggle = true;
        };

        // clear last symbol of a current operand

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
