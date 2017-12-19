(function(){
  const app = angular.module('buttons', []);
  
  app.directive('button', function(){
    return {
      restrict: 'E',
      templateUrl: './app/directives/button/button.html',
      transclude: true,
      controllerAs: 'button',
      controller: function($scope) {
        
        // switcher to cgange input to a second number

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
            $scope.first = $scope.first.concat(dot);
            return;
          }
          if ( $scope.operator && !$scope.second.includes('.') ) {
            $scope.second = $scope.second.concat(dot);
          }
        };

        // find out: first or second operand is adding..

        this.setValue = value => {
          if (this.toggle) {
            this.setFirstOperand(value);
            return;
          }
          this.setSecondOperand(value);
        };

        // Set value for $scope.first variable

        this.setFirstOperand = firstOperand => {
          if ($scope.first === '0') {
            $scope.first = firstOperand;
            return;
          }
          $scope.first = $scope.first.concat(firstOperand);
        };

        // Set value for $scope.second variable

        this.setSecondOperand = secondOperand => {
          if ($scope.second == '' || $scope.second == '0') {
            $scope.second = secondOperand;
            return;
          }
          $scope.second = $scope.second.concat(secondOperand);
        };

        // Set value for $scope.operator variable and check $scope.first

        this.setOperator = operator => {
          if ( this.checkForMinusNumber(operator) ) {
            return;
          }

          if ($scope.first === '-' || $scope.first === '-.') {
            $scope.first = '0';
          }

          if ($scope.second && $scope.operator) {
            this.actionPlusChooseNextOperator(operator);
            return;
          }
          $scope.operator = operator;
          this.toggle = false;
        };

        // check if user want to use minus number for operation

        this.checkForMinusNumber = minus => {
            const condition = minus === '-' &&
                this.toggle &&
                !$scope.first.toString().includes('-') &&
                $scope.first === '0';

            if (condition) {
                $scope.first = minus;
                return;
            }

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
              return;
            }
            $scope.first = $scope.first.slice(0, -1);
            return;
          }

          if ($scope.second.length === 1) {
              $scope.second = '';
              return;
          }
          $scope.second = $scope.second.slice(0, -1);
        };
      }
    };
  });
})();
